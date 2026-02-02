import { addSeconds } from 'date-fns';
import {
  Balances,
  Payment,
  PaymentStatus,
  Quote,
  SupraBalanceResponse,
  SupraPaymentCreateResponse,
  SupraPaymentStatusResponse,
  SupraQuoteByIdResponse,
  SupraQuoteResponse,
} from './interface/supra.interfaces';
import { TRANSACTION_COST_USD } from './supra.constants';

export class SupraMapper {
  static toQuote(data: SupraQuoteResponse): Quote {
    return {
      quoteId: data.id,
      initialCurrency: data.initialCurrency,
      finalAmount: data.finalAmount,
      transactionCost: TRANSACTION_COST_USD * data.exchangeRate,
      finalCurrency: data.finalCurrency,
      exchangeRate: data.exchangeRate,
      expiresAt: addSeconds(new Date(), 45).toISOString(),
    };
  }

  static toQuoteFromById(data: SupraQuoteByIdResponse): Quote {
    return {
      quoteId: data.id,
      initialCurrency: data.initialCurrency,
      finalAmount: parseInt(data.finalAmount, 10),
      transactionCost: TRANSACTION_COST_USD * data.exchangeRate,
      finalCurrency: data.finalCurrency,
      exchangeRate: data.exchangeRate,
      expiresAt: data.expiresAt,
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

  static toPaymentStatus(data: SupraPaymentStatusResponse): PaymentStatus {
    return {
      paymentId: data.id,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      fullName: data.fullName,
      email: data.email,
      createdAt: data.createdAt,
    };
  }

  static toBalances(data: SupraBalanceResponse): Balances {
    const findAmount = (currency: string): number => {
      const item = data.find((b) => b.currency.toLowerCase() == currency);
      return item?.amount ?? 0;
    };

    return {
      usd: findAmount('usd'),
      cop: findAmount('cop'),
    };
  }
}
