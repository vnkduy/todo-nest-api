import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private primaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.primaService.user.findUnique({ where: { email } });
    if (!user) return null;
    const passwordValid = await this.comparePassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException();
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async register(registerData: RegisterDto): Promise<string> {
    try {
      const hashedPassword = await this.hashPassword(registerData.password);
      const data = await this.primaService.user.create({
        data: {
          email: registerData.email,
          password: hashedPassword,
        },
      });
      const token = this.jwtService.sign(
        {
          id: data.id,
          email: data.email,
        },
        {
          secret: process.env.SECRET_JWT_TOKEN,
        },
      );
      return token;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(login: LoginDto): Promise<string> {
    try {
      const { email, password } = login;
      const isExisted = await this.primaService.user.findUnique({
        where: { email },
      });
      if (!isExisted) {
        throw new BadRequestException();
      }
      const isMatch = await this.comparePassword(password, isExisted.password);
      if (!isMatch) {
        throw new BadRequestException();
      }
      const token = this.jwtService.sign(
        {
          id: isExisted.id,
          email: isExisted.email,
        },
        {
          secret: process.env.SECRET_JWT_TOKEN,
        },
      );

      return token;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  private async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }
}
