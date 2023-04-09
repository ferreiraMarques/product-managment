import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user === null) throw new BadRequestException('incorrect credentials');

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) throw new BadRequestException('incorrect credentials');

    const payload = {
      username: user.email,
      sub: user.id,
    };
    const token = await this.jwtService.sign(payload);

    return new PayloadDto(token, user.email);
  }

  async verifyToken(token: string) {
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new ForbiddenException();
    }

    const user = await this.usersRepository.findOne({
      where: {
        email: payload.username,
        id: payload.sub,
      },
    });

    if (user === null) throw new ForbiddenException();

    return true;
  }

  async createUser(email: string, username: string, password: string) {
    const user = new User(username, email);
    user.password = await bcrypt.hash('password', 10);
    await this.usersRepository.save(user);
  }
}
