import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Types } from 'mongoose';
import { ApiParam } from '@nestjs/swagger';
import { DeleteVehiclesDto } from './dto/delete.dto copy';
import { MongoIdParamDto } from './dto/mongo-id.dto';

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
  async findOne(@Param() params: MongoIdParamDto) {
    const mongoId = new Types.ObjectId(params.id);
    const data = await this.vehiclesService.findOne(mongoId);
    return {
      statusCode: HttpStatus.OK,
      message: 'เรียกข้อมูลสำเร็จ',
      data,
    };
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'รหัส ObjectId ของรถ' })
  async update(
    @Param() params: MongoIdParamDto,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    const mongoId = new Types.ObjectId(params.id);
    const data = await this.vehiclesService.update(mongoId, updateVehicleDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'แก้ไขข้อมูลสำเร็จ',
      data,
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'รหัส ObjectId ของรถ' })
  async remove(@Param() params: MongoIdParamDto) {
    const mongoId = new Types.ObjectId(params.id);
    const data = await this.vehiclesService.remove(mongoId);
    return {
      statusCode: HttpStatus.OK,
      message: 'ลบข้อมูลสำเร็จ',
      data,
    };
  }

  @Delete()
  async removeAll(@Body() deleteVehiclesDto: DeleteVehiclesDto) {
    const objectIds = deleteVehiclesDto.ids.map((id) => new Types.ObjectId(id));
    const data = await this.vehiclesService.removeAll(objectIds);
    return {
      statusCode: HttpStatus.OK,
      message: 'ลบข้อมูลทั้งหมดสำเร็จ',
      data,
    };
  }
}
