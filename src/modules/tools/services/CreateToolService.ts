import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/infra/errors/AppError';
import Tool from '../infra/typeorm/entities/Tool';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  title: string;
  link: string;
  description: string;
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ title, link, description }: IRequest): Promise<Tool> {
    const tool = await this.toolsRepository.create({
      title,
      link,
      description,
    });

    return tool;
  }
}

export default CreateToolService;
