import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createUser, getUserByEmailOrPhone, User } from "./lib/db/instadb.client";

@Injectable()
export class UserService {
  constructor(
  ) { }

  async register(emailOrPhone: string, passcode: string, location: string, manualLocation: boolean): Promise<User> {
    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const user = {
      id: '',
      emailOrPhone,
      passcode: hashedPasscode,
      location,
      manualLocation,
    }

    return await createUser(user);
  }

  async login(emailOrPhone: string, passcode: string): Promise<User | null> {
    const user = await this.findUserByEmailOrPhone(emailOrPhone);

    if (user && await bcrypt.compare(passcode, user.passcode)) {
      return user;
    }
    return null;
  }

  async findUserByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    return await getUserByEmailOrPhone(emailOrPhone);
  }
}
