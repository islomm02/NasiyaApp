import { Controller,  Post, Body, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginSellerDto } from './dto/create-auth.dto';
import { ResetPasswordDto } from 'src/admin/dto/create-admin.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @Post("login")
  login(@Body() loginSellerDto: LoginSellerDto) {
    return this.authService.login(loginSellerDto);
  }
  
  
  @Post("reset-password")
  resetPasword(@Body() resetDto: ResetPasswordDto) {
    return this.authService.resetPass(resetDto);
  }

}
