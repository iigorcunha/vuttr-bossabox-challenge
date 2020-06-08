import { getRepository, Repository } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import AppError from '@shared/infra/errors/AppError';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '../entities/Tool';

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async findTools(user_id: string): Promise<Tool[]> {
    const tool = await this.ormRepository.find({
      where: { user_id },
    });

    return tool;
  }

  public async findByTag(
    user_id: string,
    tag: string
  ): Promise<Tool[] | undefined> {
    const tools = await this.ormRepository
      .createQueryBuilder('tool')
      .where(':tag = any (tags)', { tag })
      .andWhere('tool.user_id = :user_id', { user_id })
      .getMany();

    return tools;
  }

  public async create({
    title,
    link,
    description,
    tags,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      link,
      description,
      tags,
      user_id,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  public async delete(user_id: string, id: string): Promise<number> {
    try {
      await this.ormRepository.findOneOrFail({
        where: { user_id, id },
      });

      const toolAffected = await this.ormRepository
        .delete(id)
        .then(tool => tool.affected);

      return toolAffected;
    } catch {
      throw new AppError('This tool does not belongs to you', 401);
    }
  }

  public async findByTitle(title: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne({
      where: { title },
    });

    return tool;
  }
}

export default ToolsRepository;
