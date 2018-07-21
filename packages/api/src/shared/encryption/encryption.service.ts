import {Component} from '@nestjs/common';
import {compare, genSalt, hash} from 'bcrypt';

@Component()
export class EncryptionService {
  public async compare (input: string, salt: string): Promise<boolean> {
    return await compare(input, salt);
  }

  public async genSalt (): Promise<string> {
    return await genSalt();
  }

  public async hash (input: string, salt: string): Promise<string> {
    return await hash(input, salt);
  }
}

export const encryptionService: EncryptionService = new EncryptionService();
