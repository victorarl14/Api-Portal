import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dto/auth.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    // Por ahora usamos un userId hardcodeado, después implementaremos autenticación JWT
    const userId = 'temp-user-id';
    return this.messagesService.createMessage(userId, createMessageDto);
  }

  @Get()
  async getAllMessages() {
    return this.messagesService.getAllMessages();
  }

  @Get('user/:userId')
  async getMessagesByUser(@Param('userId') userId: string) {
    return this.messagesService.getMessagesByUser(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }
} 