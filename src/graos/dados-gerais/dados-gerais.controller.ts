import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmpresasService } from 'src/auth/auth-empresas/auth-empresas.service';
import { AuthService } from 'src/auth/auth.service';
import { DadosGeraisService } from './dados-gerais.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RateLimitGuard } from 'src/auth/rate-limit/rate-limit.guard';
import { ClassificacaoDto, DadosGeraisDetDto, DadosGeraisPorTicketDto, DadosGeraisResponseDto, DocumentosDto } from './dados-gerais.dto';

@ApiTags('Exportação Grãos')
@Controller('dados-gerais')
export class DadosGeraisController {
    constructor(
        private readonly authEmpresaService: AuthEmpresasService,
        private readonly dadosGeraisService: DadosGeraisService,
        private readonly authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard, RateLimitGuard)
    @Post('por-ticket')
    @ApiBody({ type: DadosGeraisPorTicketDto })
    @ApiResponse({ status: 200, description: 'Ticket Encontrado', type: DadosGeraisResponseDto })
    @ApiResponse({ status: 203, description: 'Sem permissão para essa placa' })
    @ApiResponse({ status: 204, description: 'Não encontrado movimentação dessa placa nas últimas 6 horas' })
    async buscarPorTck(@Body() entrada: any, @Req() requisicao: Request, @Res() resposta: Response) {

        const authHeader = requisicao.headers['authorization'];
        const dados = await this.authService.desgenerateToken(authHeader && authHeader.split(' ')[1]);

        const ticket = entrada.ticket;


        const foundEmpresa = await this.authEmpresaService.retornaEmpresa(dados);

        if (foundEmpresa.nivel != 7) {
            const foundTicket = await this.dadosGeraisService.retornaDadosGeraisTicket(ticket, foundEmpresa.nivel)
            if (foundTicket.length === 0)
                return resposta.status(HttpStatus.NO_CONTENT).json({ msg: 'Ticket não encontrado' });
            if (foundTicket.length > 1) {
                for (var i = 0; i < foundTicket.length; i++) {
                    var documentos: DocumentosDto[] = foundTicket.map(ticket => ({
                        numero: ticket.numeronota,
                        chave: ticket.chavenota,
                        peso: ticket.pesonota
                    }));
                }
            }

            const foundDet = await this.dadosGeraisService.retornaDadosGeraisDetTicket(ticket);

            const historicoEtapas: DadosGeraisDetDto[] = [];
            const detDto = new DadosGeraisDetDto();
            for (const item of foundDet) {

                switch (item.tipoetapa) {
                    case 5:
                        detDto.agendamento = item.dataetapa;
                        break;
                    case 1:
                        detDto.entradaPatio = item.dataetapa;
                        break;
                    case 22:
                        const classificacaoDto = new ClassificacaoDto();
                        classificacaoDto.dataClassificacao = item.dataetapa;
                        classificacaoDto.statusClassificacao = item.statusproc == 3 ? 'Aceito' : 'Recusado';
                        detDto.classificacao = [classificacaoDto];
                        break;
                    case 2:
                        detDto.chamado = item.dataetapa;
                        break;
                    case 4:
                        detDto.saidaPatio = item.dataetapa;
                        break;
                    case 21:
                        detDto.entradaRecinto = item.dataetapa;
                        break;
                    case 24:
                        detDto.saidaRecinto = item.dataetapa;
                        break;
                    default:
                        break;
                }
            }
            historicoEtapas.push(detDto);

            var dadosGerais: DadosGeraisResponseDto = {
                status: foundTicket[0].status,
                ticket: foundTicket[0].ticket,
                placa: foundTicket[0].placa,
                produto: foundTicket[0].produto,
                etapaAtual: foundTicket[0].etapaatual,
                dataEtapaAtual: foundTicket[0].dataetapaatual,
                pesoliquido: foundTicket[0].pesoliquido,
                dataAlvo: foundTicket[0].dataalva,
                horaAlvo: foundTicket[0].horaalvo,
                documentos,
                transportadora:
                {
                    cnpj: foundTicket[0].cnpjtransportadora,
                    razaoSocial: foundTicket[0].transportadora
                }
                ,
                depositante:
                {
                    cnpj: foundTicket[0].cnpjdepositante,
                    razaoSocial: foundTicket[0].depositante
                }
                ,
                cliente:
                {
                    cnpj: foundTicket[0].cnpjcliente,
                    razaoSocial: foundTicket[0].cliente
                }
                ,
                destinatario:
                {
                    cnpj: foundTicket[0].cnpjdestinatario,
                    razaoSocial: foundTicket[0].destinatario
                }
                ,
                emitente:
                {
                    cnpj: foundTicket[0].cnpjemitente,
                    razaoSocial: foundTicket[0].emitente
                }
                ,
                agrupador: foundTicket[0].agrupador,
                historicoEtapas
            };

            return resposta.status(HttpStatus.OK).json({ dadosGerais });
        } else {
            return resposta.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ msg: 'Sem permissão para esse ticket' });
        }


    }
}
