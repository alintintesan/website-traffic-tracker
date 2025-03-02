import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Website {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' , unique: true })
    origin: string;
}