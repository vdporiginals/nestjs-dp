import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/jwt-strat/jwt-auth.guard';
import { ErrorsLoggerFilter } from 'src/utils/errors-logger.filter';
import FindOneParams from 'src/utils/find-one-params';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Posts from './posts.entity';
import PostsService from './posts.service';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @UseFilters(ErrorsLoggerFilter)
  getPostById(@Param() { id }: FindOneParams): Promise<Posts> {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto): Promise<Posts> {
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): Promise<Posts> {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(Number(id));
  }
}
