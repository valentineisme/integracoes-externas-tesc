import { Controller, Post, Body, Get, UseGuards, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmpresasService } from './auth-empresas/auth-empresas.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { Response } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authEmpresaService: AuthEmpresasService
  ) { }

  @Post('empresa')
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido', type: AuthResponseDto }) 
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: any, @Res() resposta: Response) {
    
    const payload = { login: loginDto.login, senha: loginDto.senha };
    
    if ((await this.authEmpresaService.retornaEmpresa(payload)) == null)
      throw new HttpException(
        { msg: 'Credenciais inválidas' },
        HttpStatus.UNAUTHORIZED
      )

    var retornoEmpresa = await this.authEmpresaService.validaEmpresa(payload);

    if (retornoEmpresa == false) {
      var idEmpresa = (await this.authEmpresaService.retornaEmpresa(payload)).id;
      var novoToken = await this.authService.generateToken(payload);
      this.authEmpresaService.update(idEmpresa, novoToken, new Date())
    } else {
      var novoToken = (await this.authEmpresaService.retornaEmpresa(payload)).token;
    }
    return resposta.status(HttpStatus.OK).json({
      token: novoToken,
      tipo: 'Bearer'
    });
  }
}