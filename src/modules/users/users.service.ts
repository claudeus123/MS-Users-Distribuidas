import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){
    
  }

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const user =  this.userRepository.create({...createUserDto, password});
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne(
      {
        where: {
          email: email
        }
      }
    )
    console.log(user);
    if (user) return user;
    return null;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(email);
    if (!user) return null;

    user.password = encodePassword(updateUserDto.password);
    return this.userRepository.save(user);


  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
