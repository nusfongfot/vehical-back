import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { mongo } from 'mongoose';

export function handleServiceError(
  error: unknown,
  fallbackMessage = 'เกิดข้อผิดพลาดภายในระบบ',
): never {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    throw new ConflictException(['ข้อมูลนี้มีอยู่ในระบบแล้ว']);
  }

  if (error instanceof Error) {
    throw new BadRequestException([error.message]);
  }

  throw new InternalServerErrorException([fallbackMessage]);
}
