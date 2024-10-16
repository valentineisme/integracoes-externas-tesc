import { Module } from '@nestjs/common';
import { AuthEmpresasService } from './auth-empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEmpresasEntity } from 'src/db/entities/auth-empresas.entity';

@Module({
  providers: [AuthEmpresasService],
  imports: [TypeOrmModule.forFeature([AuthEmpresasEntity])],
  controllers: [],
  exports: [AuthEmpresasService]
})
export class AuthEmpresasModule {}
