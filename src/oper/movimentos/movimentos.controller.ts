import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthEmpresasService } from 'src/auth/auth-empresas/auth-empresas.service';
import { MovimentosService } from './movimentos.service';
import { AuthService } from 'src/auth/auth.service';
import { RateLimitGuard } from 'src/auth/rate-limit/rate-limit.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('movimentos')
export class MovimentosController {
    constructor(
        private readonly authEmpresaService: AuthEmpresasService,
        private readonly movimentosService: MovimentosService,
        private readonly authService: AuthService
      ) { }

      @UseGuards(JwtAuthGuard, RateLimitGuard)
      @Post('ultimo-placa')
      async buscarUltMovPlaca(@Body() entrada: any, @Req() requisicao: Request) {

        const authHeader = requisicao.headers['authorization'];
        const dados = await this.authService.desgenerateToken(authHeader && authHeader.split(' ')[1]);
        
        const placa = entrada.placa;

        const foundAbrangencia = await this.authEmpresaService.validaAbrangencia(dados.login, placa)
        
        if (!foundAbrangencia)
            return { msg: 'Sem permissão para essa placa'}
        if (await this.movimentosService.retornaUltimoMovimentoPlaca(placa))
            return await this.movimentosService.retornaUltimoMovimentoPlaca(placa)
        return { msg: 'Não encontrado movimentação dessa placa nas últimas 6 horas' }
      }
}
