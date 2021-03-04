import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import Post from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number): Promise<void> {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
