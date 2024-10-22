import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'graos.Vw_Dados_Gerais_V2_Por_Nota' })
export class DadosGeraisPorNotaEntity {
    @Column({type: 'varchar'})
    status: string;
    @PrimaryColumn({type: 'varchar'})
    ticket: string;
    @Column({type: 'varchar'})
    placa: string;
    @Column({type: 'varchar'})
    produto: string;
    @Column({type: 'varchar'})
    etapaatual: string;
    @Column({type: 'datetime'})
    dataetapaatual: Date;
    @Column({type: 'varchar'})
    numeronota: string;
    @PrimaryColumn({type: 'varchar'})
    chavenota: string;
    @Column({type: 'float'})
    pesonota: number;
    @Column({type: 'float'})
    pesoliquido: number;
    @Column({type: 'varchar'})
    transportadora: string;
    @Column({type: 'varchar'})
    cnpjtransportadora: string;
    @Column({type: 'varchar'})
    depositante: string;
    @Column({type: 'varchar'})
    cnpjdepositante: string;
    @Column({type: 'varchar'})
    cliente: string;
    @Column({type: 'varchar'})
    cnpjcliente: string;
    @Column({type: 'varchar'})
    destinatario: string;
    @Column({type: 'varchar'})
    cnpjdestinatario: string;
    @Column({type: 'varchar'})
    emitente: string;
    @Column({type: 'varchar'})
    cnpjemitente: string;
    @Column({type: 'date'})
    dataalva: Date;
    @Column({type: 'varchar'})
    horaalvo: string;
    @Column({type: 'varchar'})
    agrupador: string;    
}

@Entity({ name: 'graos.Vw_Dados_Gerais_V2' })
export class DadosGeraisEntity {
    @Column({type: 'varchar'})
    status: string;
    @PrimaryColumn({type: 'varchar'})
    ticket: string;
    @Column({type: 'varchar'})
    placa: string;
    @Column({type: 'varchar'})
    produto: string;
    @Column({type: 'varchar'})
    etapaatual: string;
    @Column({type: 'datetime'})
    dataetapaatual: Date;
    @Column({type: 'varchar'})
    numeronota: string;
    @PrimaryColumn({type: 'varchar'})
    chavenota: string;
    @Column({type: 'float'})
    pesonota: number;
    @Column({type: 'float'})
    pesoliquido: number;
    @Column({type: 'varchar'})
    transportadora: string;
    @Column({type: 'varchar'})
    cnpjtransportadora: string;
    @Column({type: 'varchar'})
    depositante: string;
    @Column({type: 'varchar'})
    cnpjdepositante: string;
    @Column({type: 'varchar'})
    cliente: string;
    @Column({type: 'varchar'})
    cnpjcliente: string;
    @Column({type: 'varchar'})
    destinatario: string;
    @Column({type: 'varchar'})
    cnpjdestinatario: string;
    @Column({type: 'varchar'})
    emitente: string;
    @Column({type: 'varchar'})
    cnpjemitente: string;
    @Column({type: 'date'})
    dataalva: Date;
    @Column({type: 'varchar'})
    horaalvo: string;
    @Column({type: 'varchar'})
    agrupador: string;    
}

@Entity({ name: 'graos.Vw_Dados_Agend_Detalhado' })
export class DadosGeraisDetEntity {
    @PrimaryColumn({type: 'varchar'})
    tck: string;
    @PrimaryColumn({type: 'smallint'})
    tipoetapa: number;
    @Column({type: 'smallint'})
    statusproc: number;
    @PrimaryColumn({type: 'datetime'})
    dataetapa: Date;
}