import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthEmpresasService } from 'src/auth/auth-empresas/auth-empresas.service';
import { MovimentosService } from './movimentos.service';
import { AuthService } from 'src/auth/auth.service';
import { RateLimitGuard } from 'src/auth/rate-limit/rate-limit.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UltMovDto, UltMovResponseDto } from './movimentos.dto';
import { Request, Response } from 'express';

@ApiTags('Outras Operações')
@Controller('movimentos')
export class MovimentosController {
    constructor(
        private readonly authEmpresaService: AuthEmpresasService,
        private readonly movimentosService: MovimentosService,
        private readonly authService: AuthService
      ) { }

      @UseGuards(JwtAuthGuard, RateLimitGuard)
      @Post('ultimo-placa')
      @ApiBody({ type: UltMovDto })
      @ApiResponse({ status: 200, description: 'Movimento encontrado', type: UltMovResponseDto }) 
      @ApiResponse({ status: 203, description: 'Sem permissão para essa placa'}) 
      @ApiResponse({ status: 204, description: 'Não encontrado movimentação dessa placa nas últimas 6 horas' }) 
      async buscarUltMovPlaca(@Body() entrada: any, @Req() requisicao: Request, @Res() resposta: Response) {

        const authHeader = requisicao.headers['authorization'];
        const dados = await this.authService.desgenerateToken(authHeader && authHeader.split(' ')[1]);
        
        const placa = entrada.placa;

        const foundAbrangencia = await this.authEmpresaService.validaAbrangencia(dados.login, placa)
        
        if (!foundAbrangencia) {
          return resposta.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ msg: 'Sem permissão para essa placa' });
      }
      
      const movimento = await this.movimentosService.retornaUltimoMovimentoPlaca(placa);
      
      if (movimento) {
          return resposta.status(HttpStatus.OK).json(movimento);
      }
      
      return resposta.status(HttpStatus.NO_CONTENT).json({ msg: 'Não encontrado movimentação dessa placa nas últimas 6 horas' });
  
      }
}
