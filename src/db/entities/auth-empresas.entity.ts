import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'AUTH.EMPRESAS' })
export class AuthEmpresasEntity {
    @Column({type: 'varchar'})
    usuario: string;
    @Column({type: 'varchar'})
    senha: string;
    @Column({type: 'varchar'})
    token: string;
    @Column({type: 'int'})
    nivel: number;
    @Column({type: 'bit'})
    ativo: boolean;
    @Column({type: 'datetime'})
    datacriacao: Date;
    @Column({type: 'datetime'})
    dataatualizacao: Date;
    @PrimaryColumn({type: 'varchar'})
    id: string;
}