import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TravelPlan {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  countryCode: string;

  @Column()
  userId: number;

  @Column('simple-json', { nullable: true })
  expenses: {
    description: string;
    amount: number;
    category: string;
  }[];
}