
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

//import { Order } from 'src/order/entities/order.entity';
import { Profile } from './entities/profile.entity';



@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    // @InjectRepository(Order)
    // private orderRepository: Repository<Order>,
  ) {}

    async create(
    userId: number,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });
    return this.profileRepository.save(profile);
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    let profile: Profile = new Profile();
    profile.bio = updateProfileDto.bio;
    profile.age = updateProfileDto.age;
    profile.id = id;

    return this.profileRepository.save(profile);
  }


  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
