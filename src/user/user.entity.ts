import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emailOrPhone: string;

  @Column()
  passcode: string;

  @Column()
  location: string;

  @Column({ default: false })
  manualLocation: boolean;
}
