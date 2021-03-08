import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/posts.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorsLoggerFilter } from './utils/errors-logger.filter';
import { CategoryModule } from './categories/category.module';
@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorsLoggerFilter,
    },
  ],
})
export class AppModule {}
