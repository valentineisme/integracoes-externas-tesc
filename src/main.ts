import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Integrações Externas')
    .setDescription('Envie um e-mail para ti@terminalsc.com.br solicitando o Login e Senha e inclua as informações de CNPJ, razão social e tipo de visualização (1 - transportadora, 2 - depositante, 3 - destinatário, 4 - emitente, 5 - cliente, 6 - agrupado ou 7 - armazém). Limite de 10 requisições por minuto/token')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Exportação Grãos')
    .addTag('Outras Operações')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
