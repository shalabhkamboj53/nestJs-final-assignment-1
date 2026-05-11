// src/common/filters/http-exception.filter.ts
// Global exception filter to handle all HTTP exceptions and return standardized JSON responses

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Handle validation errors from BadRequestException
    let errorMessage: string;
    let errors: unknown = undefined;

    if (
      status === HttpStatus.BAD_REQUEST &&
      typeof exceptionResponse === 'object'
    ) {
      const responseObject = exceptionResponse as Record<string, unknown>;
      errors = responseObject.message;
      errorMessage = 'Validation failed';
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const responseObject = exceptionResponse as Record<string, unknown>;
      errorMessage =
        typeof responseObject.message === 'string'
          ? responseObject.message
          : 'An error occurred';
    } else {
      errorMessage = String(exceptionResponse);
    }

    // Send standardized error response
    response.status(status).json({
      success: false,
      message: errorMessage,
      errors,
      statusCode: status,
    });
  }
}
