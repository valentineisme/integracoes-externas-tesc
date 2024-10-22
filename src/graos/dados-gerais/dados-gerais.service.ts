import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DadosGeraisDetEntity, DadosGeraisEntity, DadosGeraisPorNotaEntity } from 'src/db/entities/graos/dados-gerais.entity';
import { Between, IsNull, LessThan, MoreThan, Not, Repository } from 'typeorm'

@Injectable()
export class DadosGeraisService {
    constructor(
        @InjectRepository(DadosGeraisPorNotaEntity)
        private readonly dadosGeraisPorNotaRepository: Repository<DadosGeraisPorNotaEntity>,
        @InjectRepository(DadosGeraisDetEntity)
        private readonly dadosDetRepository: Repository<DadosGeraisDetEntity>,
        @InjectRepository(DadosGeraisEntity)
        private readonly dadosGeraisRepository: Repository<DadosGeraisEntity>
    ){}

    async retornaDadosGeraisJanela(nivel: number, inicio: Date, fim: Date): Promise<DadosGeraisEntity[]>{

        const whereCondition: any = {
            dataetapaatual: Between(inicio, fim)
        };

        if (nivel === 1) {
            whereCondition.transportadora = Not(IsNull()); 
        } else if (nivel === 2) {
            whereCondition.depositante = Not(IsNull());  
        } else if (nivel === 3){
            whereCondition.destinatario = Not(IsNull());  
        } else if (nivel === 4){
            whereCondition.emitente = Not(IsNull());  
        } else if (nivel === 5){
            whereCondition.cliente = Not(IsNull());  
        } else if (nivel === 6){
            whereCondition.agrupador = Not(IsNull());  
        }

        const foundDados = await this.dadosGeraisRepository.find({
            where : whereCondition
        });

        return foundDados
    }

    async retornaDadosGeraisTicket(ticket: string, nivel: number): Promise<DadosGeraisPorNotaEntity[]>{

        const whereCondition: any = {
            ticket: ticket
        };

        if (nivel === 1) {
            whereCondition.transportadora = Not(IsNull()); 
        } else if (nivel === 2) {
            whereCondition.depositante = Not(IsNull());  
        } else if (nivel === 3){
            whereCondition.destinatario = Not(IsNull());  
        } else if (nivel === 4){
            whereCondition.emitente = Not(IsNull());  
        } else if (nivel === 5){
            whereCondition.cliente = Not(IsNull());  
        } else if (nivel === 6){
            whereCondition.agrupador = Not(IsNull());  
        }

        const foundDados = await this.dadosGeraisPorNotaRepository.find({
            where : whereCondition
        });

        return foundDados
    }

    async retornaDadosGeraisDetTicket(ticket: string): Promise<DadosGeraisDetEntity[]>{


        const foundUDet = await this.dadosDetRepository.find({
            where : {
                tck: ticket
            }
        });

        return foundUDet
    }

}
