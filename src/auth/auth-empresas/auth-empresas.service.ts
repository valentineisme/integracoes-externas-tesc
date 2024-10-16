import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthAbrangenciaEntity, AuthEmpresasEntity, AuthPlacaTransEntity } from 'src/db/entities/empresas/auth-empresas.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class AuthEmpresasService {
    constructor(
        @InjectRepository(AuthEmpresasEntity)
        private readonly authEmpresaRepository: Repository<AuthEmpresasEntity>,
        @InjectRepository(AuthAbrangenciaEntity)
        private readonly authAbrangenciaRepository: Repository<AuthAbrangenciaEntity>,
        @InjectRepository(AuthPlacaTransEntity)
        private readonly authPlacaTransRepository: Repository<AuthPlacaTransEntity>
    ){}

    async validaAbrangencia(usuario: string, placa: string): Promise<boolean>{

        const foundAbrangencia = await this.authAbrangenciaRepository.find({
            where : {
                usuario : usuario
            }
        });

        const abrangenciaCnpjs = foundAbrangencia.map(item => item.abrangencia);

        const foundPlaca = await this.authPlacaTransRepository.findOne({
            where :{
                placa : placa, cnpj: In(abrangenciaCnpjs)
            }
        })

        return !!foundPlaca
    }

    async validaEmpresa(corpo: any): Promise<boolean> {

        const dataUpdate = new Date();
        const foundEmpresa = await this.authEmpresaRepository.findOne({
            where: {
                usuario: corpo.login, senha: corpo.senha
            }
        })

        const diferencaDatas = new Date(dataUpdate).getTime() - new Date(foundEmpresa.dataatualizacao).getTime();
        const diferencaMinutos = Math.floor(diferencaDatas / 1000 / 60); 

        if (diferencaMinutos > 60)
            return false
        return true
    }

    async retornaEmpresa(corpo: any): Promise<AuthEmpresasEntity>{
        const foundEmpresa = await this.authEmpresaRepository.findOne({
            where: {
                usuario: corpo.login, senha: corpo.senha
            }
        })

        return foundEmpresa
    }

    async update(id: string, token: string, dataAtual: Date){
        const foundEmpresa = await this.authEmpresaRepository.findOne({ where: { id } });

        if (foundEmpresa){
            await this.authEmpresaRepository.update(id, this.updtToEntity(dataAtual, token))
        }
    }

    private updtToEntity(dataUpdate, tokenUpdate): Partial<AuthEmpresasEntity>{
        return {
            dataatualizacao: dataUpdate,
            token: tokenUpdate
        }
    }
}
