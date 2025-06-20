import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, User } from '../../entities';
import { CreateMessageDto } from '../../dto/auth.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createMessage(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const { subject, message_content } = createMessageDto;

    const message = this.messageRepository.create({
      user_id: userId,
      subject,
      message_content,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesByUser(userId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(messageId: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Mensaje no encontrado');
    }

    message.is_read = true;
    return this.messageRepository.save(message);
  }
} 