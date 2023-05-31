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
    
    const createProfile: UpdateProfileDto = {
      // user_id: user?.id,
      first_name: registerDto?.first_name,
      last_name: registerDto?.last_name
    };

    const userInformation = this.userInformationRepository.create(createProfile)
    return await this.userInformationRepository.save(userInformation);
  }
  async register(registerDto: RegisterDto){
    const user = await this.createUser(registerDto);
    const userProfile = await this.createProfile(registerDto, user);
    user.userInformationId = userProfile;
    console.log(user.userInformationId);
    return this.userRepository.save(user);
  }
  async findAll() {
    return await this.userRepository.find({
      relations: ['userInformationId']
    });
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne(
      {
        where: {
          email: email
        },
        relations: ['userInformationId']
      }
    )
    // console.log(user);
    if (user) return user;
    return null;
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })

    console.log(user);
    console.log(id);
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

  async profile (id: number){
    const user = await this.userRepository.findOne(
      {
        where: {
          id: id
        },
        relations: ['userInformationId']
      }
    )
    // console.log(user);
    if (!user) return null;

    return [
      user.email,
      user.city,
      user.userInformationId
    ]
  }
}
