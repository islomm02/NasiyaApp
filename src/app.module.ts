import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { DebterModule } from './debter/debter.module';
import { DebtModule } from './debt/debt.module';
import { PrismaModule } from './prisma/prisma.module';
import { SellersModule } from './sellers/sellers.module';
import { TermsModule } from './terms/terms.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [  RegionModule, DebterModule, DebtModule, PrismaModule, SellersModule, TermsModule, JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '60s' },
    }), JwtModule, AuthModule, AdminModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
