import { AppBalance, PaymentStatusResponse, type PaymentStatus } from '@tht/shared';

export class PaymentStatusResponseDto implements PaymentStatusResponse {
  paymentId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export class BalancesResponseDto implements AppBalance {
  usd: number;
  cop: number;
}
