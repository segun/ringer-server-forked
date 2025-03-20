import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  emailOrPhone: string;

  @IsString()
  passcode: string;
}