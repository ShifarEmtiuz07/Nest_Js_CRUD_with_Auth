import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from 'src/order/entities/order.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  userPassword: string;

  @Column({ nullable: true })
  userNewPassword:string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];
}
