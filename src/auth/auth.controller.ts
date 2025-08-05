import { Controller,  Post, Body, UseGuards, Get, Request,} from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginSellerDto } from './dto/create-auth.dto';
import { ResetPasswordDto } from 'src/admin/dto/create-admin.dto'
import { TokenGuard } from 'src/guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @Post("login")
  login(@Body() loginSellerDto: LoginSellerDto) {
    return this.authService.login(loginSellerDto);
  }
  
  
  // @Post("reset-password")
  // resetPasword(@Body() resetDto: ResetPasswordDto) {
  //   return this.authService.resetPass(resetDto);
  // }

  @UseGuards(TokenGuard)
  @Get("me")
  me(@Request() req){
    console.log(req);
    
    return this.authService.me(req.user.id)
  }

}
