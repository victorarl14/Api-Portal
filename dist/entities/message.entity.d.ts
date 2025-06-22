import { User } from './user.entity';
export declare class Message {
    id: string;
    name: string;
    email: string;
    content: string;
    read: boolean;
    created_at: Date;
    updated_at: Date;
    user: User;
}
