import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt-strategy'; 
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthEmpresasEntity } from 'src/db/entities/empresas/auth-empresas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEmpresasModule } from './auth-empresas/auth-empresas.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEmpresasEntity]), AuthEmpresasModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports : [AuthService]
})
export class AuthModule {}