import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.guard';
//import {Public} from

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //@Public()
  @Post('/signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  //@Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  
  @Patch('/changePass/:id')
  changePass(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updatePass(+id, updateUserDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
