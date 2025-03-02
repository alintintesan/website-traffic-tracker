import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Website } from "./website.entity";

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    path: string;

    @ManyToOne(() => Website, (website) => website.id)
    @JoinColumn({ name: 'websiteId' })
    website: Website;
}