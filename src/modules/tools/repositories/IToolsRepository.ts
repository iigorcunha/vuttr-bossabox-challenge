import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  findByTag(tag: string): Promise<Tool | undefined>;
  create(data: ICreateToolDTO): Promise<Tool | undefined>;
  delete(id: string): Promise<void>;
}
