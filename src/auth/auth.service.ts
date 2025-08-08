import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAdminDto, LoginSellerDto, RefreshDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(loginSellerDto: LoginSellerDto) {
    try {
      const seller = await this.prisma.sellers.findFirst({
        where: { login: loginSellerDto.login }
      });

      if (!seller) {
         throw new NotFoundException('User not found');
          
      }

      const match = bcrypt.compareSync(loginSellerDto.password, seller.password);
      if (!match) {
        return { message: "Invalid password", status: 400 };
      }

      const payload = { role: seller.role, id: seller.id };

      const token = this.jwt.sign(payload, { expiresIn: '15m' }); // access token
      const refreshToken = this.jwt.sign(payload, { expiresIn: '7d' }); // refresh token

      await this.prisma.sellers.update({
        where: { id: seller.id },
        data: { refreshToken }
      });

      return { token, refreshToken };
    } catch (error) {
      return { message: error.message };
    }
  }

  async loginAdmin(loginSellerDto: LoginAdminDto) {
    try {
      const seller = await this.prisma.admin.findFirst({
        where: { username: loginSellerDto.username }
      });

      if (!seller) {
         throw new NotFoundException('Admin not found');
          
      }

      const match = bcrypt.compareSync(loginSellerDto.password, seller.password);
      if (!match) {
        return { message: "Invalid password", status: 400 };
      }

      const payload = { role: seller.role, id: seller.id };

      const token = this.jwt.sign(payload, { expiresIn: '15m' }); // access token
      const refreshToken = this.jwt.sign(payload, { expiresIn: '7d' }); // refresh token

      await this.prisma.sellers.update({
        where: { id: seller.id },
        data: { refreshToken }
      });

      return { token, refreshToken };
    } catch (error) {
      return { message: error.message };
    }
  }

  async refresh(data: RefreshDto) {
    try {
      const decoded = this.jwt.verify(data.refreshToken);
      const seller = await this.prisma.sellers.findUnique({
        where: { id: decoded.id }
      });

      if (!seller || seller.refreshToken !== data.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.jwt.sign(
        { id: seller.id, role: seller.role },
        { expiresIn: '15m' }
      );

      return { token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }

  async me(id: string) {
    return await this.prisma.sellers.findFirst({ where: { id } });
  }

  async resetPass(resetDto: ResetPasswordDto) {
    // add logic to reset password
  }
}
