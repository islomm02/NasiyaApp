import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto, LoginSellerDto, RefreshDto } from './dto/create-auth.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginSellerDto: LoginSellerDto) {
    return this.authService.login(loginSellerDto);
  }

  @Post('login-admin')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshToken: RefreshDto) {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(TokenGuard)
  @Get('me')
  me(@Request() req) {

    return this.authService.me(req.user.id);
  }
}
