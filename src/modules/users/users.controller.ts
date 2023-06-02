import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.usersService.create(createUserDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // console.log(registerDto);
    return await this.usersService.register(registerDto);
  }

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req){
    // console.log(req);
    const { id } = req.user;
    return await this.usersService.profile(id);
  }


  // @Get(':email')
  // async findOne(@Param('email') email: string) {
  //   console.log(email);
  //   return await this.usersService.findOne(email);
  // }

  @Get(':id')
  async findOneById(@Param('id') id: number){
    return await this.usersService.findUser(id);

  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(email, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
