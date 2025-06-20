"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = exports.LoginUserDto = exports.RegisterUserDto = void 0;
class RegisterUserDto {
    username;
    email;
    password;
    first_name;
    last_name;
}
exports.RegisterUserDto = RegisterUserDto;
class LoginUserDto {
    email;
    password;
}
exports.LoginUserDto = LoginUserDto;
class CreateMessageDto {
    subject;
    message_content;
}
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=auth.dto.js.map