import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Order])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
