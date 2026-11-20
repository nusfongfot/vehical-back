import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Types } from 'mongoose';
import { ApiParam } from '@nestjs/swagger';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const data = await this.vehiclesService.create(createVehicleDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'สร้างข้อมูลรถสำเร็จ',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.vehiclesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'เรียกข้อมูลทั้งหมดสำเร็จ',
      data,
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'รหัส ObjectId ของรถ' })
  async findOne(@Param('id') id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('รูปแบบ ID ไม่ถูกต้อง');
    }
    const data = await this.vehiclesService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'เรียกข้อมูลสำเร็จ',
      data,
    };
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'รหัส ObjectId ของรถ' })
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('รูปแบบ ID ไม่ถูกต้อง');
    }
    const data = await this.vehiclesService.update(id, updateVehicleDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'แก้ไขข้อมูลสำเร็จ',
      data,
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'รหัส ObjectId ของรถ' })
  async remove(@Param('id') id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('รูปแบบ ID ไม่ถูกต้อง');
    }
    const data = await this.vehiclesService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'ลบข้อมูลสำเร็จ',
      data,
    };
  }
}
