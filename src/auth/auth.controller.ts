import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import User from 'src/user/users.entity';
import { ErrorsLoggerFilter } from 'src/utils/errors-logger.filter';
import { RequestWithUser } from './auth.interface';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import JwtAuthGuard from './jwt-strat/jwt-auth.guard';
import { LocalAuthGuard } from './local-strat/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseFilters(ErrorsLoggerFilter)
  async register(@Body() registrationData: RegisterDto): Promise<User> {
    return await this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response<User, Record<string, any>>> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(
    @Res() response: Response,
  ): Promise<Response<unknown, Record<string, any>>> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser): User {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
