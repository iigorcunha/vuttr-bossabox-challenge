import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToolService from '@modules/tools/services/CreateToolService';

class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description } = request.body;

    const createTool = container.resolve(CreateToolService);

    const tool = await createTool.execute({ title, link, description });

    return response.json(tool);
  }
}

export default ToolsController;