import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

// Em um ambiente de produção, use o Redis ou outro armazenamento compartilhado.
const requestTimestamps = new Map<string, number>();

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
    
    if (requestTimestamps.has(token)) {
      const lastRequestTime = requestTimestamps.get(token);
      const TEN_MINUTES = 10 * 60 * 1000; 

      if (currentTime - lastRequestTime < TEN_MINUTES) {
        throw new UnauthorizedException('Requisição duplicada dentro de 10 minutos.');
      }
    }

    // Atualiza o timestamp da última requisição
    requestTimestamps.set(token, currentTime);

    return true;
  }
}