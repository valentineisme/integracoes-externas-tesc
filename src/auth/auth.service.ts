import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEmpresasEntity } from 'src/db/entities/empresas/auth-empresas.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async generateToken(payload: any) {
        return this.jwtService.sign(payload);
    }

    async desgenerateToken(token: any) {
        return this.jwtService.decode(token);
    }
}