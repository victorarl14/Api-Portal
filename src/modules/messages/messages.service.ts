import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { CreateMessageDto } from '../../dto/message.dto';
import { User } from 'src/entities';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(user: User, createMessageDto: CreateMessageDto): Promise<Message> {
    const { content, name, email } = createMessageDto;

    const newMessage = this.messageRepository.create({
      content,
      name: user ? user.first_name + ' ' + user.last_name : name,
      email: user ? user.email : email,
      user: user,
    });

    return this.messageRepository.save(newMessage);
  }

  async getMessagesByUser(userId: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!messages) {
      throw new NotFoundException(`No se encontraron mensajes para el usuario con ID ${userId}`);
    }

    return messages;
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) {
      throw new NotFoundException(`No se encontró el mensaje con ID ${id}`);
    }
    message.read = true;
    return this.messageRepository.save(message);
  }
} 