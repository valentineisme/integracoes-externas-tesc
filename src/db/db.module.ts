import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'mssql',
            host: configService.get<string>('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/entities/**'],
            synchronize: false,
            options: {
                encrypt: false,
                trustServerCertificate: true,
                enableArithAbort: true
             }
        }),
        inject: [ConfigService]
    })]
})
export class DbModule {}