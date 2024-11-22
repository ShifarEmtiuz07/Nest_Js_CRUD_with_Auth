//import { UserService } from './user.service';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Order } from 'src/order/entities/order.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const userEmail = createUserDto.userEmail;

    const existUser = await this.userRepository
      .createQueryBuilder('users')
      .where('users.userEmail=:userEmail', { userEmail })
      .select(['users.id'])
      .getOne();

    if (existUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    createUserDto.userPassword = await bcrypt.hash(
      createUserDto.userPassword,
      saltRounds,
    );

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile', 'orders'],
    });
  }

  async findOne(userId: number): Promise<User> {
    const user= await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'orders'],
    });
    if(!user){
      throw new NotFoundException(`User with user id ${userId} not found`);
    }
    return user;
  }

  async findOneByUserName(userName: string): Promise<User> {
    const user= await this.userRepository.findOne({
      where: { userName: userName },
      relations: ['profile', 'orders'],
    });
    if(!user){
      throw new NotFoundException(`User with user id ${userName} not found`);
    }
    return user;
  }






  async update(userId: number, updateUserDto: UpdateUserDto) {

   

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'orders'],
    });
    
    user.userName = updateUserDto.userName;
    user.userEmail = updateUserDto.userEmail;
    user.userPassword=updateUserDto.userPassword;
    user.id = userId;

    return this.userRepository.save(user);
  }



  async updatePass(userId: number, updateUserDto: UpdateUserDto) {

    const saltRounds = 10;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'orders'],
    });

    

    const isValidPass = await bcrypt.compare(
      updateUserDto.userPassword,
      user.userPassword,
    );

    if (!isValidPass) {
      throw new UnauthorizedException('Password do not match.Please try again');
    }
     
    updateUserDto.userNewPassword = await bcrypt.hash(
      updateUserDto.userNewPassword,
      saltRounds,
    );

    user.userName = updateUserDto.userName;
    user.userEmail = updateUserDto.userEmail;
    user.userPassword=updateUserDto.userNewPassword;
    user.id = userId;

    return this.userRepository.save(user);
  }









  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
