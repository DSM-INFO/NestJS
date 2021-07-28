import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) { }

  async vaildateUser(userId: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.usersService.getById(userId);
      await this.verifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: User) {
    const payload = { userId: user.userId, id: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.ConfigService.get('JWT_EXPIRATION_TIME')) * 1000,
    };
  }

  async logOut() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }

  async register(user: User) {
    const hashedPassword = await hash(user.password, 10);
    try {
      const { password, ...returnUser } = await this.usersService.create({
        ...user,
        password: hashedPassword,
      });

      return returnUser;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'User with that userId already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}