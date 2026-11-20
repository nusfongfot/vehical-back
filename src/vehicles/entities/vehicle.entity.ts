import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../../common/mongodb/base.entity';
import { Vehicle } from '../schemas/vehicles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VehicleEntity extends BaseEntity<Vehicle> {
  constructor(
    @InjectModel(Vehicle.name)
    vehicleModel: Model<Vehicle>,
  ) {
    super(vehicleModel);
  }
}
