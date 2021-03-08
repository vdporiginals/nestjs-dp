import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import User from '../../user/users.entity';
import { UsersService } from '../../user/users.service';
import { mockedConfigService } from '../../utils/mocks/config.service';
import { AuthService } from '../auth.service';
describe('The AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authService = await module.get(AuthService);
    usersService = await module.get(UsersService);
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof authService.getCookieWithJwtToken(userId)).toEqual(
        'string',
      );
    });
  });
});
