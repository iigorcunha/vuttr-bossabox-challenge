import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: string[];
  user_id: string;
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({
    title,
    link,
    description,
    tags,
    user_id,
  }: IRequest): Promise<Tool> {
    const checkTool = await this.toolsRepository.findByTitle(title);

    if (checkTool) {
      throw new AppError('this tool already exists', 401);
    }

    const tool = await this.toolsRepository.create({
      title,
      link,
      description,
      tags,
      user_id,
    });

    return tool;
  }
}

export default CreateToolService;
