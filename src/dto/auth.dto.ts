export class RegisterUserDto {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class CreateMessageDto {
  subject: string;
  message_content: string;
} 