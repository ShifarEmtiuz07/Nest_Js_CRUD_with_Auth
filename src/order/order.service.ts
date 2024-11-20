import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(
    userId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('User do not exist', HttpStatus.BAD_REQUEST);

    const order = this.orderRepository.create({ ...createOrderDto, user });
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {

    let order: Order=new Order();

    order.product=updateOrderDto.product;
    order.amount=updateOrderDto.amount;
    order.id = id;

    return this.orderRepository.save(order);
  }
  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
