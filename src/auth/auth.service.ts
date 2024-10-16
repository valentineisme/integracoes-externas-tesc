import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEmpresasEntity } from 'src/db/entities/auth-empresas.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async generateToken(payload: any) {
        return this.jwtService.sign(payload);
    }    
}