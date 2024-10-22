import { ApiProperty } from '@nestjs/swagger';

export class UltMovDto {
  @ApiProperty({ description: 'Placa' })
  placa: string;
}

export class UltMovResponseDto {
    @ApiProperty()
    cavalo: string;
    @ApiProperty()
    carreta: string;
    @ApiProperty()
    recebedor: string;
    @ApiProperty()
    transportadora: string;
    @ApiProperty()
    transportadora_cnpj: string;
    @ApiProperty()
    produto: string;
    @ApiProperty()
    motorista: string;
    @ApiProperty()
    cpf_moto: string;
    @ApiProperty()
    porao: number;
    @ApiProperty()
    ApiProperty: string;
    @ApiProperty()
    entrada: string;
    @ApiProperty()
    saida: string;
    @ApiProperty()
    pesoentrada: number;
    @ApiProperty()
    pesosaida: number;
    @ApiProperty()
    liquido: number;
    @ApiProperty()
    programacao: string;
    @ApiProperty()
    navio: string;
    @ApiProperty()
    obssaida: string;
    @ApiProperty()
    periodo: string;
    @ApiProperty()
    tcksaida: number;
    @ApiProperty()
    tckentrada: number;
  }