import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, StreamableFile, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
// import { diskStorage } from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid'

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
    // console.log(req.headers);
    // console.log(req.headers.authorization);
    const { id } = req.user;
    return await this.usersService.profile(id);
  }


  // @Get(':email')
  // async findOne(@Param('email') email: string) {
  //   console.log(email);
  //   return await this.usersService.findOne(email);
  // }

  // @Get(':id')
  // async findOneById(@Param('id') id: number){
  //   return await this.usersService.findUser(id);

  // }

  // @Patch(':email')
  // async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.usersService.update(email, updateUserDto);
  // }

  @Patch('edit')
  @UseGuards(JwtAuthGuard)
  async editInformation(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.usersService.update(user, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  uploadFile(@UploadedFile() file, @Request() req){
    const { id }  = req.user; 
    const status = this.usersService.uploadImage(id, file);
    return status;
    console.log('Archivo subido exitosamente');
  }


  // @Get('file')
  // getFile(@Res() res: Response)  {
    
  //   const imagePath = join(process.cwd(), './uploads/1.jpg');
  //   res.sendFile(imagePath);
  //   // const file = createReadStream(join(process.cwd(), './uploads/1.jpg'));
  //   // return new StreamableFile(file);
  // }
  @Get('image')
  @UseGuards(JwtAuthGuard)
  getFile(@Request() req, @Res() res) {
    const user = req.user;
    const userInformation = user.userInformationId;
    const profileImagePath = userInformation.profile_image;
    // console.log(profileImagePath);
    const file = createReadStream(join(process.cwd(), `./${profileImagePath}`));
    file.pipe(res);
}

  
}
