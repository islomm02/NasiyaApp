import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {AdminModule, AppController, AppService, AuthModule, ChatModule, DebtModule, DebterModule, ExampleMessagesModule, FaqModule, ImagesClientModule, ImagesDebtModule, PayDebtModule, PaymentsModule, PrismaModule, RegionModule, SellersModule, TermsModule, MulterModule} from "./exporter/index"

@Module({
  imports: [  RegionModule, DebterModule, DebtModule, PrismaModule, SellersModule, MulterModule , TermsModule, JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '15m' },
    }), JwtModule, AuthModule, AdminModule, ImagesDebtModule, ImagesClientModule, PayDebtModule, PaymentsModule, ExampleMessagesModule, FaqModule, ChatModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
