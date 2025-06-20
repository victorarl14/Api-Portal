import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dto/auth.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createMessage(createMessageDto: CreateMessageDto): Promise<import("../../entities").Message>;
    getAllMessages(): Promise<import("../../entities").Message[]>;
    getMessagesByUser(userId: string): Promise<import("../../entities").Message[]>;
    markAsRead(id: string): Promise<import("../../entities").Message>;
}
