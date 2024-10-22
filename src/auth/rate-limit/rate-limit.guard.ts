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
    
    if (!authorizationHeader) {
      throw new UnauthorizedException('Token de autenticação não encontrado.');
    }



    const token = authorizationHeader.split(' ')[1];
    const currentTime = Date.now();
    
    // if (requestTimestamps.has(token)) {
    //   const lastRequestTime = requestTimestamps.get(token);
    //   const TEN_MINUTES = 1 * 60 * 1000; 

    //   if (currentTime - lastRequestTime < TEN_MINUTES) {
    //     throw new UnauthorizedException('Requisição duplicada dentro de 1 minuto.');
    //   }
    // }

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