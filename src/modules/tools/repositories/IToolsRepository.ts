import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  findByTag(user_id: string, tag: string): Promise<Tool[] | undefined>;
  create(data: ICreateToolDTO): Promise<Tool | undefined>;
  delete(user_id: string, id: string): Promise<number>;
  findTools(user_id: string): Promise<Tool[]>;
  findByTitle(title: string): Promise<Tool | undefined>;
}
