import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { MovimentosModule } from './oper/movimentos/movimentos.module';
import { AuthEmpresasModule } from './auth/auth-empresas/auth-empresas.module';
import { DadosGeraisModule } from './graos/dados-gerais/dados-gerais.module';

@Module({
  imports: [AuthModule, DbModule, ConfigModule.forRoot({ isGlobal: true }), MovimentosModule, AuthEmpresasModule, DadosGeraisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
