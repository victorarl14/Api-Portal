import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dto/message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/entities';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: User,
  ) {
    return this.messagesService.createMessage(user, createMessageDto);
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