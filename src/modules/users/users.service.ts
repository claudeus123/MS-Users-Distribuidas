import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { UserInformation } from 'src/entities/user-information.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserInformation) private userInformationRepository: Repository<UserInformation>
  ){
    
  }

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const user =  this.userRepository.create({...createUserDto, password});
    return await this.userRepository.save(user);
  }

  async createUser(registerDto: RegisterDto) {
    const password = encodePassword(registerDto?.password);
    registerDto.password = password;


    const createUser: CreateUserDto = { 
      password: password, 
      email: registerDto?.email, 
      city: registerDto?.city 
    };
    
    const user =  this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async createProfile(registerDto: RegisterDto, user: User) {
    
    console.log(registerDto);
    console.log(registerDto?.first_name);
    
    const createProfile: UpdateProfileDto = {
      user_id: user?.id,
      first_name: registerDto?.first_name,
      last_name: registerDto?.last_name
    };
    console.log(createProfile);
    const userInformation = this.userInformationRepository.create(createProfile)
    console.log(userInformation);
    return await this.userInformationRepository.save(userInformation);

    return [
      user,
      userInformation
    ]
  }
  async register(registerDto: RegisterDto){
    const user = await this.createUser(registerDto);
    const userProfile = await this.createProfile(registerDto, user);
    return [
      user,
      userProfile
    ]
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
    // console.log(user);
    if (user) return user;
    return null;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(email);
    if (!user) return null;

    user.password = encodePassword(updateUserDto.password);
    return await this.userRepository.save(user);


  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
