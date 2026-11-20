import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';

export class DeleteVehiclesDto {
  @ApiProperty({
    description: 'รายการ ObjectId ของรถที่ต้องการลบ',
    example: ['6affc2457e15279a2feb5691', '6affc2457e15279a2feb5692'],
    type: [String],
  })
  @IsArray({ message: 'ids ต้องเป็น Array เท่านั้น' })
  @ArrayNotEmpty({ message: 'กรุณาระบุ ID อย่างน้อย 1 รายการ' })
  @IsMongoId({ each: true, message: 'รูปแบบ ID ในรายการไม่ถูกต้อง' })
  ids: string[];
}
