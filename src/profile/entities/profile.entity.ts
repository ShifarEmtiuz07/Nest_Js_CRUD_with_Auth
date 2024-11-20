import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { profile } from 'console';
import { User } from 'src/user/entities/user.entity';

@Entity({name:'profiles'})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  age: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
