// src/common/exceptions/http.exception.ts
// Custom HTTP exception class for standardized error responses

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(
      {
        success: false,
        message,
        statusCode,
      },
      statusCode,
    );
  }
}
