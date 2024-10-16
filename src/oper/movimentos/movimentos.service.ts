import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UltMovEntity } from 'src/db/entities/oper/movimento.entity';
import { Repository } from 'typeorm'

@Injectable()
export class MovimentosService {
    constructor(
        @InjectRepository(UltMovEntity)
        private readonly ultMovRepository: Repository<UltMovEntity>
    ){}

    async retornaUltimoMovimentoPlaca(placa: string): Promise<UltMovEntity>{
        const foundUltPlaca = await this.ultMovRepository.findOne({
            where : {
                cavalo: placa
            },
            order: {
                saida: 'DESC' 
            }
        });

        return foundUltPlaca
    }
}
