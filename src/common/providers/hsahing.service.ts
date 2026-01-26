import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRound = 10;
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRound);
  }
  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
