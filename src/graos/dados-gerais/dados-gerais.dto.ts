import { ApiProperty } from '@nestjs/swagger';

export class DadosGeraisPorTicketDto {
  @ApiProperty()
  ticket: string;
}

export class DadosGeraisPorJanelaDto {
  @ApiProperty()
  inicio: Date;
  @ApiProperty()
  fim: Date;
}

export class EmpresaDto {
  @ApiProperty()
  cnpj: string;
  @ApiProperty()
  razaoSocial: string;
}

export class DocumentosDto {
  @ApiProperty()
  numero: string;
  @ApiProperty()
  chave: string;
  @ApiProperty()
  peso: number;
}

export class ClassificacaoDto {
  @ApiProperty()
  dataClassificacao: Date;
  @ApiProperty()
  statusClassificacao: string;
}

export class DadosGeraisDetDto {
  @ApiProperty()
  agendamento: Date;
  @ApiProperty()
  entradaPatio: Date;
  @ApiProperty({ type: [ClassificacaoDto]})
  classificacao: ClassificacaoDto[];
  @ApiProperty()
  chamado: Date;
  @ApiProperty()
  saidaPatio: Date;
  @ApiProperty()
  entradaRecinto: Date;
  @ApiProperty()
  saidaRecinto: Date;
}

export class DadosGeraisTicketResponseDto {
  @ApiProperty()
  status: string;
  @ApiProperty()
  ticket: string;
  @ApiProperty()
  placa: string;
  @ApiProperty()
  produto: string;
  @ApiProperty()
  etapaAtual: string;
  @ApiProperty()
  dataEtapaAtual: Date;
  @ApiProperty()
  pesoLiquido: number;
  @ApiProperty()
  dataAlvo: Date;
  @ApiProperty()
  horaAlvo: string;
  @ApiProperty({ type: [DocumentosDto]})
  documentos: DocumentosDto[]; 
  @ApiProperty({ type: EmpresaDto})
  transportadora: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  depositante: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  cliente: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  destinatario: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  emitente: EmpresaDto; 
  @ApiProperty()
  agrupador: string;
  @ApiProperty({ type: [DadosGeraisDetDto] })
  historicoEtapas: DadosGeraisDetDto[];
}

export class DadosGeraisJanelaResponseDto {
  @ApiProperty()
  status: string;
  @ApiProperty()
  ticket: string;
  @ApiProperty()
  placa: string;
  @ApiProperty()
  produto: string;
  @ApiProperty()
  etapaAtual: string;
  @ApiProperty()
  dataEtapaAtual: Date;
  @ApiProperty()
  pesoLiquido: number;
  @ApiProperty()
  dataAlvo: Date;
  @ApiProperty()
  horaAlvo: string;
  @ApiProperty()
  numeroNota: string;
  @ApiProperty()
  chaveNota: string;
  @ApiProperty()
  pesoNota: number;
  @ApiProperty({ type: EmpresaDto})
  transportadora: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  depositante: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  cliente: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  destinatario: EmpresaDto; 
  @ApiProperty({ type: EmpresaDto})
  emitente: EmpresaDto;
}

export class DadosGeraisCountDto{
  @ApiProperty()
  numeroRegistros: number;
  @ApiProperty({ type: [DadosGeraisJanelaResponseDto]})
  agendamentos: DadosGeraisJanelaResponseDto[]; 
}