import { Module } from '@nestjs/common';
import { DadosGeraisController } from './dados-gerais.controller';
import { DadosGeraisService } from './dados-gerais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosGeraisDetEntity, DadosGeraisEntity, DadosGeraisPorNotaEntity } from 'src/db/entities/graos/dados-gerais.entity';
import { AuthEmpresasModule } from 'src/auth/auth-empresas/auth-empresas.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DadosGeraisController],
  imports: [TypeOrmModule.forFeature([DadosGeraisEntity, DadosGeraisDetEntity, DadosGeraisPorNotaEntity]), AuthEmpresasModule, AuthModule],
  providers: [DadosGeraisService]
})
export class DadosGeraisModule {}
