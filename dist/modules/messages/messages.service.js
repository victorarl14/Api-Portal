"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../../entities/message.entity");
let MessagesService = class MessagesService {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async createMessage(user, createMessageDto) {
        const { content, name, email } = createMessageDto;
        const newMessage = this.messageRepository.create({
            content,
            name: user ? user.first_name + ' ' + user.last_name : name,
            email: user ? user.email : email,
            user: user,
        });
        return this.messageRepository.save(newMessage);
    }
    async getMessagesByUser(userId) {
        const messages = await this.messageRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        if (!messages) {
            throw new common_1.NotFoundException(`No se encontraron mensajes para el usuario con ID ${userId}`);
        }
        return messages;
    }
    async getAllMessages() {
        return this.messageRepository.find({
            relations: ['user'],
            order: { created_at: 'DESC' },
        });
    }
    async markAsRead(id) {
        const message = await this.messageRepository.findOneBy({ id });
        if (!message) {
            throw new common_1.NotFoundException(`No se encontró el mensaje con ID ${id}`);
        }
        message.read = true;
        return this.messageRepository.save(message);
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map