import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Public } from 'src/skip-auth.decorator';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({ passthrough: true }) res: Response) {
        const { token, ...option } = await this.authService.login(req.user);
        res.cookie('Authentication', token, option);
    }

    @Post('logout')
    async logOut(@Res({ passthrough: true }) res: Response) {
        const { token, ...option } = await this.authService.logOut();
        res.cookie('Authentication', token, option);
    }

    @Public()
    @Post('register')
    async register(@Body() user: User): Promise<any> {
        return this.authService.register(user);
    }
}