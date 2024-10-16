import { Module } from '@nestjs/common';
import { AuthEmpresasService } from './auth-empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAbrangenciaEntity, AuthEmpresasEntity, AuthPlacaTransEntity } from 'src/db/entities/empresas/auth-empresas.entity'; 

@Module({
  providers: [AuthEmpresasService],
  imports: [TypeOrmModule.forFeature([AuthEmpresasEntity, AuthAbrangenciaEntity, AuthPlacaTransEntity])],
  controllers: [],
  exports: [AuthEmpresasService]
})
export class AuthEmpresasModule {}
