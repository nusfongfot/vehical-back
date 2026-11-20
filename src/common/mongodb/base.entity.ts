import { HydratedDocument, Model, QueryFilter, UpdateQuery } from 'mongoose';

export abstract class BaseEntity<T> {
  constructor(protected readonly entityModel: Model<T>) {}

  async save(data: Partial<T>) {
    const createdVehicle = new this.entityModel(data);
    return createdVehicle.save();
  }

  async findOne(
    filter: QueryFilter<HydratedDocument<T>>,
  ): Promise<HydratedDocument<T> | null> {
    return this.entityModel.findOne(filter).exec();
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return this.entityModel.findById(id).exec();
  }

  async find(
    filter: QueryFilter<HydratedDocument<T>> = {},
  ): Promise<HydratedDocument<T>[]> {
    return this.entityModel.find(filter).exec();
  }

  async findOneAndUpdate(
    filter: QueryFilter<HydratedDocument<T>>,
    update: UpdateQuery<HydratedDocument<T>>,
  ): Promise<HydratedDocument<T> | null> {
    return this.entityModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }

  async deleteOne(filter: QueryFilter<HydratedDocument<T>>): Promise<boolean> {
    const result = await this.entityModel.deleteOne(filter).exec();
    return result.deletedCount > 0;
  }
}
