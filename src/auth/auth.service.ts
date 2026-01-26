import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository, QueryFailedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { HashingService } from '../common/provider/hsahing.service';
import { isPostgresError } from 'src/common/errors/postgres-error.util';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await this.hashingService.hashPassword(password);
    console.log('User Create', username);
    console.log('HASHED PASSWORD:', hashedPassword);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        isPostgresError(error) &&
        error.code === '23505'
      ) {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Plz check your login credentials');
    }
  }
}
