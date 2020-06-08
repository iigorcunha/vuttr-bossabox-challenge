import { inject, injectable } from 'tsyringe';

import Tool from '../infra/typeorm/entities/Tool';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tag: string;
  user_id: string;
}

@injectable()
class FindToolsByTagService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
    const tool = await this.toolsRepository.findByTag(user_id, tag);

    return tool;
  }
}

export default FindToolsByTagService;
