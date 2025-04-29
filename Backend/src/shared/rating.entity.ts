import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';

@Entity()
@Unique(['store', 'user'])
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => Store, (store) => store.ratings)
  store: Store;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}