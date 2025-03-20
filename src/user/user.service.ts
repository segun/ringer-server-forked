import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { addChargingStatus, ChargingStatus, createUser, getUserByEmailOrPhone, User } from "./lib/db/instadb.client";

@Injectable()
export class UserService {
  constructor(
  ) { }

  async register(emailOrPhone: string, passcode: string, location: string, manualLocation: boolean): Promise<User> {
    const hashedPasscode = this.hashPasscode(passcode);
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

    if (user && this.comparePasscodes(passcode, user.passcode)) {
      return user;
    }
    return null;
  }

  async findUserByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    return await getUserByEmailOrPhone(emailOrPhone);
  }

  async updateChargingStatus(userId: string, isPluggedIn: boolean, userLocation: string, manualLocation: boolean) {
    // Update user's charging status
    return await addChargingStatus({
      id: '',
      userId,
      isPluggedIn,
      userLocation,
      manualLocation,
      statusTime: Date.now()
    } as ChargingStatus);
  }

  private hashPasscode(passcode: string): string {
    return crypto.createHash('sha256').update(passcode).digest('hex');
  }

  private comparePasscodes(plainPasscode: string, hashedPasscode: string): boolean {
    const hashedInput = this.hashPasscode(plainPasscode);
    return hashedInput === hashedPasscode;
  }
}
