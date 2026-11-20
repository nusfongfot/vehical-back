import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { Types } from 'mongoose';
@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleEntity: VehicleEntity) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const createData = await this.vehicleEntity.save(createVehicleDto);
      return createData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('ไม่สามารถบันทึกข้อมูลรถได้');
    }
  }

  async findAll() {
    try {
      const data = await this.vehicleEntity.find();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const data = await this.vehicleEntity.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException(`ไม่พบข้อมูลรถรหัส ${id}`);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
