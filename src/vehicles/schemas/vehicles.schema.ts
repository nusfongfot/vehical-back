import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

export enum EnergyType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  EV = 'EV',
  HYBRID = 'HYBRID',
}

@Schema({ timestamps: true,  versionKey: false, })
export class Vehicle {
  @Prop({ required: true, unique: true, trim: true })
  vehiclePlate: string;

  @Prop({ required: true, trim: true })
  carBrand: string;

  @Prop({ required: true, trim: true })
  model: string;

  @Prop({ default: '' })
  notes?: string;

  @Prop({ required: true, enum: EnergyType, default: EnergyType.GASOLINE })
  energyType: EnergyType;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
