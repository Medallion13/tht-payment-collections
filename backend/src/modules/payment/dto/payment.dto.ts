import { CreatePaymentRequest, CreatePaymentResponse, type DocumentType } from '@tht/shared';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentRequestDto implements CreatePaymentRequest {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsIn(['CC', 'NIT', 'CE', 'PA'])
  documentType: DocumentType;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  cellPhone: string;
}

export class CreatePaymentResponseDto implements CreatePaymentResponse {
  userId: string;
  paymentId: string;
  paymentLink: string;
  status: string;
  quoteId: string;
}
