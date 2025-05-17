import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { meetingId, userId, ...commentData } = createCommentDto;

    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId }
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${meetingId} not found`);
    }

    let user: User | undefined = undefined;
    if (userId) {
      const foundUser = await this.userRepository.findOne({
        where: { id: userId }
      });

      if (!foundUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      user = foundUser;
    }

    const comment = new Comment();
    comment.content = commentData.content;
    comment.createdAt = commentData.createdAt || new Date();
    comment.meeting = [meeting];
    if (user) {
      comment.user = [user];
    }

    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({
      relations: ['meeting', 'user']
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['meeting', 'user']
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);

    await this.commentRepository.update(id, updateCommentDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    return this.commentRepository.remove(comment);
  }
}
