import { QuoteRequest, QuoteResponse } from '@tht/shared';
import { IsNumber, IsPositive, Min } from 'class-validator';

/** Minimum amount in factor 100 ($15.00 USD) */
const MIN_AMOUNT_USD = 1500;

export class QuoteRequestDto implements QuoteRequest {
  @IsNumber()
  @IsPositive()
  @Min(MIN_AMOUNT_USD, {
    message: `Minimum amount is $15.00 USD (received: $${MIN_AMOUNT_USD / 100})`,
  })
  amount: number;
}
export class QuoteResponseDto implements QuoteResponse {
  quoteId: string;
  initialAmount: number; // factor 100
  finalAmount: number; // factor 100
  transactionCost: number; // factor 100
  exchangeRate: number;
  expiresAt: string;
  totalCost: number;
}
