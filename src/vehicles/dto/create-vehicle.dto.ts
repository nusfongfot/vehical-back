import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EnergyType } from '../schemas/vehicles.schema';

export class CreateVehicleDto {
  @ApiProperty({ example: 'กข 1234 กรุงเทพมหานคร', description: 'ป้ายทะเบียนรถยนต์' })
  @IsString()
  @IsNotEmpty()
  vehiclePlate: string;

  @ApiProperty({ example: 'Toyota', description: 'ยี่ห้อรถยนต์' })
  @IsString()
  @IsNotEmpty()
  carBrand: string;

  @ApiProperty({ example: 'Camry', description: 'รุ่นของรถยนต์' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiPropertyOptional({ example: 'Company fleet car', description: 'หมายเหตุต่างๆ' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ enum: EnergyType, example: EnergyType.HYBRID, description: 'ประเภทเชื้อเพลง/พลังงาน' })
  @IsEnum(EnergyType)
  @IsNotEmpty()
  energyType: EnergyType;
}
