/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Logger } from '@nestjs/common';
import { sanitize } from '../utils/sanitize.util';

export interface LogOperationOptions {
  // Operation name for the log
  name: string;
  // Log input arguments? Default: true
  logInput?: boolean;
  // Log output results? Default: true
  logOutput?: boolean;
}

export function LogOperation(options: LogOperationOptions) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; //Unsafe assignment of an `any` value.
    const logger = new Logger(target.constructor.name); // Unsafe argument of type `any` assigned to a parameter of type `string`. Unsafe member access .constructor on an `any` value.

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      let result: unknown = null;
      let error: Error | null = null;

      try {
        result = await originalMethod.apply(this, args); // Unsafe call of an `any` typed value.
        return result;
      } catch (e) {
        error = e instanceof Error ? e : new Error(String(e));
        throw error;
      } finally {
        const shouldLogInput = options.logInput !== false;
        const shouldLogOutput = options.logOutput !== false;

        logger.log({
          operation: options.name,
          input: shouldLogInput ? sanitize(args) : '[HIDDEN]',
          output: shouldLogOutput && result ? sanitize(result) : null,
          duration_ms: Date.now() - startTime,
          status: error ? 'error' : 'success',
          error: error ? { message: error.message } : null,
        });
      }
    };
    return descriptor;
  };
}
