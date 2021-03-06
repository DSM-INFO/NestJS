import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createNewUser(user: User): Promise<void> {
        await this.usersRepository.save(user);
    }

    async find(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ username: username });
    }

    async create(user: User): Promise<User> {
        await this.usersRepository.save(user);
        return user;
    }

    async getById(userId: string) {
        const user = this.usersRepository.findOne({ userId });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this userId does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    async getId(id: number) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }

        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND,
        );
    }
}