import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'oper.vw_ult_mov_geral' })
export class UltMovEntity {
    @Column({type: 'varchar'})
    cavalo: string;
    @Column({type: 'varchar'})
    carreta: string;
    @Column({type: 'varchar'})
    recebedor: string;
    @Column({type: 'varchar'})
    transportadora: string;
    @Column({type: 'varchar'})
    transportadora_cnpj: string;
    @Column({type: 'varchar'})
    produto: string;
    @Column({type: 'varchar'})
    motorista: string;
    @Column({type: 'varchar'})
    cpf_moto: string;
    @Column({type: 'int'})
    porao: number;
    @Column({type: 'varchar'})
    berco: string;
    @Column({type: 'varchar'})
    entrada: string;
    @Column({type: 'varchar'})
    saida: string;
    @Column({type: 'numeric'})
    pesoentrada: number;
    @Column({type: 'numeric'})
    pesosaida: number;
    @Column({type: 'numeric'})
    liquido: number;
    @Column({type: 'varchar'})
    programacao: string;
    @Column({type: 'varchar'})
    navio: string;
    @Column({type: 'varchar'})
    obssaida: string;
    @Column({type: 'varchar'})
    periodo: string;
    @PrimaryColumn({type: 'bigint'})
    tcksaida: number;
    @PrimaryColumn({type: 'bigint'})
    tckentrada: number;
}