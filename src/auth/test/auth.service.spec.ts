import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { PayloadDto } from '../dto/payload.dto';
import { LoginDto } from '../dto/login.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TypeOrmSQLITETestingModule } from '../../../test/helpers/typeorm-sqlite';

process.env.JWT_SECRET = '123*';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
      imports: [...TypeOrmSQLITETestingModule()],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return a PayloadDto object with token and email', async () => {
      const dto: LoginDto = {
        email: 'johndoe@example.com',
        password: 'password',
      };

      jest.spyOn(jwtService, 'sign').mockResolvedValue('abc123' as never);

      await service.createUser('johndoe@example.com', 'johndoe', 'password');

      const result = await service.login(dto);

      expect(result).toBeInstanceOf(PayloadDto);
      expect(result.token).toBe('abc123');
      expect(result.username).toBe('johndoe@example.com');
    });

    it('should throw BadRequestException if user not found', async () => {
      const dto: LoginDto = {
        email: 'johndoe@example.com',
        password: 'password',
      };

      await expect(service.login(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      const dto: LoginDto = {
        email: 'johndoe@example.com',
        password: 'password1',
      };

      await service.createUser('johndoe@example.com', 'johndoe', 'password');

      await expect(service.login(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyToken', () => {
    it('should return true if token is valid and user exists', async () => {
      const token = 'abc123';
      const payload = { username: 'johndoe@example.com', sub: 1 };

      await service.createUser('johndoe@example.com', 'johndoe', 'password');

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);

      const result = await service.verifyToken(token);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException if token is invalid', async () => {
      const token = 'abc123';
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

      await expect(service.verifyToken(token)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException if user does not exist', async () => {
      const token = 'abc123';
      const payload = { username: 'johndoe@example.com', sub: 1 };

      await expect(service.verifyToken(token)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
