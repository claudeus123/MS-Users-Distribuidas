import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { UserInformation } from 'src/entities/user-information.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { createWriteStream, unlink } from 'fs';
import * as fs from 'fs';



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserInformation) private userInformationRepository: Repository<UserInformation>
  ){
    
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = encodePassword(createUserDto.password);
    const user =  this.userRepository.create({...createUserDto, password});
    return await this.userRepository.save(user);
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
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

  async createProfile(registerDto: RegisterDto, user: User): Promise<UserInformation> {
    
    const createProfile: UpdateProfileDto = {
      // user_id: user?.id,
      first_name: registerDto?.first_name,
      last_name: registerDto?.last_name
    };

    const userInformation = this.userInformationRepository.create(createProfile)
    return await this.userInformationRepository.save(userInformation);
  }
  async register(registerDto: RegisterDto): Promise<User>{
    const userFound = await this.findOne(registerDto.email)
    if(userFound) throw new HttpException('Usuario ya existe', HttpStatus.BAD_REQUEST)

    const user = await this.createUser(registerDto);
    const userProfile = await this.createProfile(registerDto, user);
    user.userInformationId = userProfile;
    // console.log(user.userInformationId);
    return this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['userInformationId','sessions']
    });
  }

  async findOne(email: string): Promise<User> {
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

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }, relations: ['userInformationId','sessions']
    })

    // console.log(user);
    // console.log(id);
    if (user) return user;
    return null;
  }

  async changePassword(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(email);
    if (!user) return null;
    // console.log(user);
    // console.log(updateUserDto)
    user.password = encodePassword(updateUserDto.password);
    return await this.userRepository.save(user);

  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<any> {
    if (!user) return null;
    const userInformation = user.userInformationId;
    if(updateUserDto.city) user.city = updateUserDto.city;
    if(updateUserDto.first_name) userInformation.first_name = updateUserDto.first_name;
    if(updateUserDto.last_name) userInformation.last_name = updateUserDto.last_name;
    if (updateUserDto.nickname) userInformation.nickname = updateUserDto.nickname;
    
    await this.userRepository.save(user);
    await this.userInformationRepository.save(userInformation);

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async profile (id: number): Promise<(string | UserInformation)[]>{
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
      user.role,
      user.userInformationId
    ]
  }

  async uploadImage(id: number, file){
      const path = './uploads/' + id + "." +file.originalname.split('.')[1]; // Ruta completa de destino del archivo
      // if (fs.existsSync(path)) => PARA ELIMINAR DE BDD + await unlink(path);
      
      const user =  await this.findUser(id);
      const userInformation = user.userInformationId

      // if(fs.existsSync(userInformation.profile_image)) await unlink(userInformation.profile_image,{ force: true });
      if (fs.existsSync(userInformation.profile_image)) {
        unlink(userInformation.profile_image, (err) => {
          if (err) console.log(err);
        });
      }
      
      const writeStream = createWriteStream(path);
      writeStream.write(file.buffer);
      writeStream.end();

      userInformation.profile_image = path;
      await this.userInformationRepository.save(userInformation); 

      // console.log(file);
      return HttpStatus.OK;
    
  }
}
