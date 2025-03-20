import { IsString, IsBoolean } from 'class-validator';

export class RegisterRequest {
    @IsString()
    emailOrPhone: string;

    @IsString()
    passcode: string;

    @IsString()
    location: string;

    @IsBoolean()
    manualLocation: boolean;
}