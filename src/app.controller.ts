import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'API Health Check' })
  @ApiResponse({
    status: 200,
    description: 'API is running',
    example: { message: 'NestJS Backend is running!' },
  })
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
