import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/errors/AppError';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteToolByIdService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<number> {
    const toolAffected = await this.toolsRepository.delete(user_id, id);

    if (toolAffected === 0) {
      throw new AppError('This tool does not exists', 404);
    }

    return toolAffected;
  }
}

export default DeleteToolByIdService;
