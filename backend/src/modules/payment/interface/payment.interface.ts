export interface QuoteValidation {
  isValid: boolean;
  isExpired: boolean;
  totalCost: number;
  errorMessage?: string;
}
