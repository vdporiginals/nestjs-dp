import { Module } from '@nestjs/common';
import Post from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
