import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Diary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
}