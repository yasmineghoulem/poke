import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async find(@Req() request: Request): Promise<any> {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      return await this.userService.auth(data.id);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    return this.userService.create(createUserDto);
  }
  @Post('login')
  async login(
    @Body() findUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const user = await this.userService.findOne(findUserDto);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(findUserDto.password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    const jwt = await this.jwtService.signAsync({ id: user.email });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
      token: jwt,
    };
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.userService.delete(id);
  }
  @Put(':id')
  update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }
}
