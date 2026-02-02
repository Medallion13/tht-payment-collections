import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreatePaymentResponseDto } from './dto/create-payment-response.dto';
import { CreatePaymentRequestDto } from './dto/create-payment.dto';
import { QuoteRequestDto } from './dto/quote-request.dto';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('quote')
  async getQuote(@Body() dto: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.paymentService.getQuote(dto);
  }

  @Post('process')
  @HttpCode(200)
  async createPayment(@Body() dto: CreatePaymentRequestDto): Promise<CreatePaymentResponseDto> {
    return this.paymentService.createPayment(dto);
  }
}
