import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SupraClientService } from './services/supra-client.service';
import { SupraPaymentService } from './services/supra-payment.service';
import { SupraQuoteService } from './services/supra-quote.service';
import { SupraService } from './supra.service';

@Module({
  imports: [HttpModule],
  providers: [SupraService, SupraClientService, SupraQuoteService, SupraPaymentService],
  exports: [SupraService, SupraQuoteService, SupraPaymentService],
})
export class SupraModule {}
