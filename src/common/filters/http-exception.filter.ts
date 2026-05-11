// src/common/filters/http-exception.filter.ts
// Global exception filter to handle all HTTP exceptions and return standardized JSON responses

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
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
    let errorMessage = 'Internal Server Error';
    let errors = undefined;

    if (
      status === HttpStatus.BAD_REQUEST &&
      typeof exceptionResponse === 'object'
    ) {
      const responseObject = exceptionResponse as any;
      errors = responseObject.message;
      errorMessage = 'Validation failed';
    } else if (typeof exceptionResponse === 'object') {
      const responseObject = exceptionResponse as any;
      errorMessage = responseObject.message || 'An error occurred';
    } else {
      errorMessage = exceptionResponse as string;
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
