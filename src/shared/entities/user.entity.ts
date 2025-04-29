import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from './store.entity';
import { Rating } from './rating.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  STORE_OWNER = 'store_owner',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 400, nullable: true })
  address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}