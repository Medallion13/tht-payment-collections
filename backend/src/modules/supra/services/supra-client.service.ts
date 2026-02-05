import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LogOperation } from '../../../common/decorators/log-operation.decorator';
import { AuthSuccess } from '../interface/supra.interfaces';
import { handleSupraError } from '../supra.errors';

@Injectable()
export class SupraClientService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // Get env variables
  private get apiUrl(): string {
    return this.configService.getOrThrow<string>('supra.apiUrl');
  }

  private get clientId(): string {
    return this.configService.getOrThrow<string>('supra.clientId');
  }

  private get secret(): string {
    return this.configService.getOrThrow<string>('supra.secret');
  }

  @LogOperation({ name: 'getToken', logOutput: false, logInput: false })
  private async getToken(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<AuthSuccess>(
          `${this.apiUrl}/v1/auth/token`,
          {
            clientId: this.clientId,
            clientSecret: this.secret,
          },
          {
            headers: { 'X-API-TYPE': 'public' },
          },
        ),
      );

      return response.data.token;
    } catch (e) {
      throw handleSupraError(e);
    }
  }

  // Generic helper
  async authenticatedRequest<T>(method: 'GET' | 'POST', path: string, data?: unknown): Promise<T> {
    const token = await this.getToken();
    const url = `${this.apiUrl}${path}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-API-TYPE': 'public',
    };

    const response =
      method === 'GET'
        ? await firstValueFrom(this.httpService.get<T>(url, { headers }))
        : await firstValueFrom(this.httpService.post<T>(url, data, { headers }));

    return response.data;
  }
}
