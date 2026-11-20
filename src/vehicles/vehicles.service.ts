import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { Types } from 'mongoose';
import { handleServiceError } from '../common/utils/error-handler.util';
@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleEntity: VehicleEntity) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const createData = await this.vehicleEntity.save(createVehicleDto);
      return createData;
    } catch (error) {
      handleServiceError(error, 'ไม่สามารถบันทึกข้อมูลรถได้');
    }
  }

  async findAll() {
    try {
      const data = await this.vehicleEntity.find();
      return data;
    } catch (error) {
      handleServiceError(error, 'เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const data = await this.vehicleEntity.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException([`ไม่พบข้อมูลรถรหัส ${id}`]);
      }
      return data;
    } catch (error) {
      handleServiceError(error, 'เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  }

  async update(id: Types.ObjectId, updateVehicleDto: UpdateVehicleDto) {
    try {
      const data = await this.vehicleEntity.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateVehicleDto,
        },
      );
      if (!data) {
        throw new NotFoundException([`ไม่พบข้อมูลรถรหัส ${id}`]);
      }
      return data;
    } catch (error) {
      handleServiceError(error, 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล');
    }
  }

  async remove(id: Types.ObjectId) {
    try {
      const result = await this.vehicleEntity.deleteOne({
        _id: id,
      });
      if (!result) {
        throw new NotFoundException([`ไม่พบข้อมูลรถรหัส ${id}`]);
      }
      return result;
    } catch (error) {
      handleServiceError(error, 'เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  }

  async removeAll(ids: Types.ObjectId[]) {
    try {
      const result = await this.vehicleEntity.deleteMany({
        _id: { $in: ids },
      });
      if (result === 0) {
        throw new NotFoundException(['ไม่พบข้อมูลรถที่ต้องการลบ (ข้อมูลอาจถูกลบไปแล้ว)']);
      }
      return { deleted: true, count: ids.length };
    } catch (error) {
      handleServiceError(error, 'เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  }
}
