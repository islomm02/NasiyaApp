import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service'; 
import { RegionModule } from 'src/region/region.module';
import { DebterModule } from 'src/debter/debter.module'; 
import { DebtModule } from 'src/debt/debt.module'; 
import { PrismaModule } from 'src/prisma/prisma.module'; 
import { SellersModule } from 'src/sellers/sellers.module'; 
import { TermsModule } from 'src/terms/terms.module';
import { AuthModule } from 'src/auth/auth.module'; 
import { AdminModule } from 'src/admin/admin.module'; 
import { ImagesDebtModule } from 'src/images-debt/images-debt.module'; 
import { ImagesClientModule } from 'src/images-client/images-client.module'; 
import { PayDebtModule } from 'src/pay-debt/pay-debt.module'; 
import { PaymentsModule } from 'src/payments/payments.module'; 
import { ExampleMessagesModule } from 'src/example-messages/example-messages.module';
import { FaqModule } from 'src/faq/faq.module';
import { ChatModule } from 'src/chat/chat.module'; 
import { MulterModule } from 'src/multer/multer.module';

export {AppController, AppService, RegionModule, DebtModule, DebterModule, PrismaModule, SellersModule, TermsModule, AuthModule, AdminModule, ImagesClientModule, ImagesDebtModule, PayDebtModule,PaymentsModule,ExampleMessagesModule, FaqModule, ChatModule, MulterModule}