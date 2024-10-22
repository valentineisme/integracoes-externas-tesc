import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';


// Em um ambiente de produção, use o Redis ou outro armazenamento compartilhado.
const requestTimestamps = new Map<string, number>();
const requestCounts = new Map<string, { count: number, timestamp: number }>();
const LIMIT_REQUESTS_PER_MINUTE = 5;

@Injectable()
export class RateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers['authorization'];

    const token = authorizationHeader.split(' ')[1];
    const currentTime = Date.now();

    requestTimestamps.set(token, currentTime);

    const ONE_MINUTE = 60 * 1000;

    if (requestCounts.has(token)) {
      const userData = requestCounts.get(token);

      if (currentTime - userData.timestamp > ONE_MINUTE) {
        userData.count = 0;
        userData.timestamp = currentTime;
      }

      if (userData.count >= LIMIT_REQUESTS_PER_MINUTE) {
        throw new UnauthorizedException('Número de requisições excedido. Tente novamente mais tarde.');
      }

      userData.count += 1;
    } else {
      requestCounts.set(token, { count: 1, timestamp: currentTime });
    }

    return true;
  }
}

@Injectable()
export class RateLimitGuardTicket implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { ticket } = request.body;
    if (!ticket) {
      throw new UnauthorizedException('Ticket não encontrado no corpo da requisição.');
    }
    return true;
  }
}

@Injectable()
export class RateLimitGuardPlaca implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { placa } = request.body;
    if (!placa) {
      throw new UnauthorizedException('Placa não encontrada no corpo da requisição.');
    }
    return true;
  }
}

@Injectable()
export class RateLimitGuardInicioFim implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { inicio } = request.body;
    const { fim } = request.body;
    if ((!inicio) || (!fim)) {
      throw new UnauthorizedException('Campo inicio e fim são obrigaórios.');
    }
    return true;
  }
}