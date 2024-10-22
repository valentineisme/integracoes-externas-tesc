import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DadosGeraisDetEntity, DadosGeraisEntity } from 'src/db/entities/graos/dados-gerais.entity';
import { IsNull, Not, Repository } from 'typeorm'

@Injectable()
export class DadosGeraisService {
    constructor(
        @InjectRepository(DadosGeraisEntity)
        private readonly dadosGeraisRepository: Repository<DadosGeraisEntity>,
        @InjectRepository(DadosGeraisDetEntity)
        private readonly dadosDetRepository: Repository<DadosGeraisDetEntity>
    ){}

    async retornaDadosGeraisTicket(ticket: string, nivel: number): Promise<DadosGeraisEntity[]>{

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

        const foundDados = await this.dadosGeraisRepository.find({
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
