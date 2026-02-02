import { addSeconds } from 'date-fns';
import {
  Payment,
  Quote,
  SupraPaymentCreateResponse,
  SupraQuoteResponse,
} from './interface/supra.interfaces';

export class SupraMapper {
  static toQuote(data: SupraQuoteResponse): Quote {
    return {
      quoteId: data.id,
      initialCurrency: data.initialCurrency,
      finalAmount: data.finalAmount,
      transactionCost: data.transactionCost,
      finalCurrency: data.finalCurrency,
      exchangeRate: data.exchangeRate,
      expiresAt: addSeconds(new Date(), 45).toISOString(),
    };
  }

  static toPayment(data: SupraPaymentCreateResponse): Payment {
    return {
      userId: data.userId,
      paymentId: data.id,
      paymentLink: data.paymentLink,
      status: data.status,
      quoteId: data.quoteId,
    };
  }
}
