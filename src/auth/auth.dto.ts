import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({  description: 'O login do usuário' })
  login: string;

  @ApiProperty({ description: 'A senha do usuário' })
  senha: string;
}

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', description: 'Token JWT gerado' })
    token: string;
    
    @ApiProperty({ example: 'Bearer', description: 'Tipo do token' })
    tipo: string;
  }