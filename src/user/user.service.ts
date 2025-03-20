import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(emailOrPhone: string, passcode: string, location: string, manualLocation: boolean): Promise<User> {
    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const user = this.userRepository.create({
      emailOrPhone,
      passcode: hashedPasscode,
      location,
      manualLocation,
    });
    return this.userRepository.save(user);
  }

  async login(emailOrPhone: string, passcode: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { emailOrPhone } });
    if (user && await bcrypt.compare(passcode, user.passcode)) {
      return user;
    }
    return null;
  }

  async findUserByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { emailOrPhone } });
  }
}
