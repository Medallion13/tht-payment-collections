import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SupraClientService } from './services/supra-client.service';
import { SupraQuoteService } from './services/supra-quote.service';
import { SupraService } from './supra.service';

@Module({
  imports: [HttpModule],
  providers: [SupraService, SupraClientService, SupraQuoteService],
  exports: [SupraService, SupraQuoteService],
})
export class SupraModule {}
