import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dto/message.dto';
import { User } from 'src/entities';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createMessage(createMessageDto: CreateMessageDto, user: User): Promise<import("src/entities").Message>;
    getAllMessages(): Promise<import("src/entities").Message[]>;
    getMessagesByUser(userId: string): Promise<import("src/entities").Message[]>;
    markAsRead(id: string): Promise<import("src/entities").Message>;
}
