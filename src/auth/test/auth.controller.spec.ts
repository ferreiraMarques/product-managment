import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';

jest.mock('../auth.service.ts');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const result = { token: 'abc123', username: 'test@gmail.com' };
      const credentials: LoginDto = {
        email: 'test@gmail.com',
        password: 'password',
      };
      expect(await controller.login(credentials)).toEqual(result);
    });
  });
});
