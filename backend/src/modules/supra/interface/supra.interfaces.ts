// Supra Auth responses
export interface AuthSuccess {
  token: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
export type AuthResponse = AuthSuccess | ErrorResponse;

/**
 * Supra Responses
 */
export interface SupraQuoteResponse {
  id: string;
  exchangeConfirmationToken: string;
  createdAt: string;
  expiresAt: string;
  initialAmount: number; // factor 100
  initialCurrency: string;
  finalAmount: number; // factor 100 with out fee
  finalCurrency: string;
  exchangeRate: number;
  inverseExchangeRate: number;
  transactionCost: number; // factor 100 - always 10 dolars
  exchangeRates: Record<string, number>;
}
export type QuoteResponse = SupraQuoteResponse | ErrorResponse;

/**
 * Supra Payment Creation Response
 */
export interface SupraPaymentCreateResponse {
  currency: string;
  amount: number;
  referenceId: string;
  documentType: string;
  email: string;
  cellPhone: string;
  document: string;
  fullName: string;
  description: string;
  redirectUrl: string;
  quoteId: string;
  userId: string;
  payerDocumentId: string;
  payerName: string;
  paymentLink: string;
  id: string; // This is the paymentId
  status: string; // 'CREATED'
}

export type PaymentCreateResponse = SupraPaymentCreateResponse | ErrorResponse;

/**
 * Supra Payment Creation Request
 */
export interface SupraPaymentCreateRequest {
  currency: string;
  amount: number; // factor 100
  referenceId: string;
  documentType: string; // 'CC' | 'NIT' | 'CE' | 'PA'
  email: string;
  cellPhone: string;
  document: string;
  fullName: string;
  description: string;
  redirectUrl: string;
  quoteId: string;
}

/**
 * Supra quote by ID response
 */
export interface SupraQuoteByIdResponse {
  id: string;
  exchangeConfirmationToken: string;
  createdAt: string;
  expiresAt: string;
  initialAmount: string;
  initialCurrency: string;
  finalAmount: string;
  finalCurrency: string;
  exchangeRate: number;
  inverseExchangeRate: number;
  operationTypeId: string | null;
  tokenType: string;
  exchangeRates: Record<string, number>;
}

export type QuoteByIdResponse = SupraQuoteByIdResponse | ErrorResponse;

/**
 * Supra get pyment by id
 */
export interface SupraPaymentStatusResponse {
  email: string;
  quoteId: string;
  currency: string;
  document: string;
  documentType: string;
  payerDocumentId: string;
  fullName: string;
  cellPhone: string;
  payerName: string;
  description: string;
  redirectUrl: string;
  referenceId: string;
  amount: number; // Decimal (NO factor 100)
  id: string;
  status: string;
  paymentLink: string;
  createdAt: string;
}

/**
 * Supra balances response internal array item and array definition
 */
export interface SupraBalanceItem {
  currency: string;
  amount: number;
}

export type SupraBalanceResponse = SupraBalanceItem[];

// ========================= Internal ======================================

/**
 * Internal interface for transformations
 */
export interface Quote {
  quoteId: string;
  initialCurrency: string;
  finalAmount: number; // factor 100
  transactionCost: number; //factor 100
  finalCurrency: string;
  exchangeRate: number;
  expiresAt: string; // 45 seconds from the quote response
}

/**
 * Internal interface for payment creation
 */
export interface Payment {
  userId: string;
  paymentId: string;
  paymentLink: string;
  status: string;
  quoteId: string;
}

/**
 * Internal interface for payment status
 */
export interface PaymentStatus {
  paymentId: string;
  status: string;
  amount: number;
  currency: string;
  fullName: string;
  email: string;
  createdAt: string;
}

/**
 * Internal interface for balances in this case only filter cop and usd (could be modify)
 */
export interface Balances {
  usd: number;
  cop: number;
}
