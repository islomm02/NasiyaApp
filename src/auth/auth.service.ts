import { Injectable } from '@nestjs/common';
import { LoginSellerDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService){}
  async login(loginSellerDto: LoginSellerDto) {
    try {
      const seller = await this.prisma.sellers.findFirst({where: {login: loginSellerDto.login}})
      if(!seller){
        return {message: "User not found", status: 404}
      }
      const match = bcrypt.compareSync( loginSellerDto.password,seller.password)
      if(!match){
        return {message: "Invalid password", status: 400}
      }
      const token = this.jwt.sign({role: seller.role, id: seller.id})
      return {token}
    } catch (error) {
      return {message: error.message}
    }
  }

  async me(id: string){
    return await this.prisma.sellers.findFirst({where: {id}})
  }

  async resetPass(resetDto: ResetPasswordDto){

  }


}
