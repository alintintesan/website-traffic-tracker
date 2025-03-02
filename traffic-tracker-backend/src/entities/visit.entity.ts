import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    timestamp: Date

    @ManyToOne(() => Page, (page) => page.id)
    @JoinColumn({ name: 'pageId' })
    page: Page;
}