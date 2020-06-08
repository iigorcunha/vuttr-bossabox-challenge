import { inject, injectable } from 'tsyringe';

import Tool from '../infra/typeorm/entities/Tool';
import IToolsRepository from '../repositories/IToolsRepository';

@injectable()
class ListAllToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id }): Promise<Tool[]> {
    const tool = await this.toolsRepository.findTools(user_id);

    return tool;
  }
}

export default ListAllToolsService;
