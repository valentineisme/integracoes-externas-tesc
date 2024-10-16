import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UltMovEntity } from 'src/db/entities/oper/movimento.entity';
import { AuthEmpresasModule } from 'src/auth/auth-empresas/auth-empresas.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [MovimentosService],
  imports: [TypeOrmModule.forFeature([UltMovEntity]), AuthEmpresasModule, AuthModule],
  controllers: [MovimentosController]
})
export class MovimentosModule {}
