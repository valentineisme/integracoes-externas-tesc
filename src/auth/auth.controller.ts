import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmpresasService } from './auth-empresas/auth-empresas.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authEmpresaService: AuthEmpresasService
  ) { }

  @Post('empresa')
  async login(@Body() loginDto: any) {

    const payload = { login: loginDto.login, senha: loginDto.senha };
    var retornoEmpresa = await this.authEmpresaService.validaEmpresa(payload);

    if (retornoEmpresa == false) {
      var idEmpresa = (await this.authEmpresaService.retornaEmpresa(payload)).id;
      var novoToken = await this.authService.generateToken(payload);
      this.authEmpresaService.update(idEmpresa, novoToken, new Date())
    } else {
      var novoToken = (await this.authEmpresaService.retornaEmpresa(payload)).token;
    }

    return {
      token: novoToken
    };
  }
}