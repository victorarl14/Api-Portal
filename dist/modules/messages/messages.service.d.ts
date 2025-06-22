import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { CreateMessageDto } from '../../dto/message.dto';
import { User } from 'src/entities';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    createMessage(user: User, createMessageDto: CreateMessageDto): Promise<Message>;
    getMessagesByUser(userId: string): Promise<Message[]>;
    getAllMessages(): Promise<Message[]>;
    markAsRead(id: string): Promise<Message>;
}
