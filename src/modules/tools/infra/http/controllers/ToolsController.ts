import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToolService from '@modules/tools/services/CreateToolService';
import FindToolsByTagsService from '@modules/tools/services/FindToolsByTagService';
import ListAllToolsService from '@modules/tools/services/ListAllToolsService';
import DeleteToolByIdService from '@modules/tools/services/DeleteToolByIdService';

class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;
    const user_id = request.user.id;

    const createTool = container.resolve(CreateToolService);

    const tool = await createTool.execute({
      title,
      link,
      description,
      tags,
      user_id,
    });

    return response.status(201).json(tool);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { tag } = request.query;
    const user_id = request.user.id;

    const findToolsByTags = container.resolve(FindToolsByTagsService);

    const tools = await findToolsByTags.execute({ user_id, tag });

    return response.json(tools);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAllTools = container.resolve(ListAllToolsService);

    const listTools = await listAllTools.execute({ user_id });

    return response.status(200).json(listTools);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const deleteToolById = container.resolve(DeleteToolByIdService);

    await deleteToolById.execute({ user_id, id });

    return response.status(204).send();
  }
}

export default ToolsController;
