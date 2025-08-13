import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {AdminModule, AppController, AppService, AuthModule, ChatModule, DebtModule, DebterModule, ExampleMessagesModule, FaqModule, ImagesClientModule, ImagesDebtModule, PayDebtModule, PaymentsModule, PrismaModule, RegionModule, SellersModule, TermsModule, MulterModule} from "./exporter/index"
import { CommonModule } from './common/common.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [  RegionModule, DebterModule, DebtModule, PrismaModule, SellersModule, MulterModule , TermsModule, JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '15m' },
    }), JwtModule, AuthModule, AdminModule, ImagesDebtModule, ImagesClientModule, PayDebtModule, PaymentsModule, ExampleMessagesModule, FaqModule, ChatModule, CommonModule, MessagesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
