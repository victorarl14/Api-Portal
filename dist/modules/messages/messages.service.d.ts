import { Repository } from 'typeorm';
import { Message, User } from '../../entities';
import { CreateMessageDto } from '../../dto/auth.dto';
export declare class MessagesService {
    private messageRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>);
    createMessage(userId: string, createMessageDto: CreateMessageDto): Promise<Message>;
    getMessagesByUser(userId: string): Promise<Message[]>;
    getAllMessages(): Promise<Message[]>;
    markAsRead(messageId: string): Promise<Message>;
}
