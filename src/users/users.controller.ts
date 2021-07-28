import { Public } from './../skip-auth.decorator';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Get('all')
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param() id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Public()
    @Post()
    async createNewUser(@Body() user: User): Promise<void> {
        await this.usersService.createNewUser(user);
    }

    @Delete(':id')
    async remove(@Param() id: string): Promise<void> {
        await this.usersService.remove(id);
    }
}