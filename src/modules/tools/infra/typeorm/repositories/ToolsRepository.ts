import { getRepository, Repository } from 'typeorm';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '../entities/Tool';

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async findByTag(tag: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne({
      where: { id: tag },
    });

    return tool;
  }

  public async create(data: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create(data);

    await this.ormRepository.save(tool);

    return tool;
  }

  public async delete(id: string): Promise<void> {
    const findTool = await this.ormRepository.findOne(id);

    await this.ormRepository.delete(findTool);
  }
}

export default ToolsRepository;
