import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiQueryComponent(sortByData: string[]) {
  return applyDecorators(
    ApiQuery({ name: 'search', required: false, description: 'Search term (title/description)' }),
    ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 }),
    ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 }),
    ApiQuery({ name: 'sortBy', required: false, description: 'Sort field', enum : sortByData, example: 'title' }),
    ApiQuery({ name: 'order', required: false, description: 'Sort order', enum: ['asc', 'desc'] }),
  );
}
