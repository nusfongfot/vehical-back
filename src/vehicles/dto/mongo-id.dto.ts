import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdParamDto {
  @ApiProperty({ description: 'รหัส ObjectId', example: '6affc2457e15279a2feb5691' })
  @IsMongoId({ message: 'รูปแบบ ID ไม่ถูกต้อง' })
  id: string;
}
