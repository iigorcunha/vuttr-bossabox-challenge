import { Router } from 'express';
import ToolsController from '../controllers/ToolsController';

const toolsRouter = Router();

const toolsController = new ToolsController();

toolsRouter.get('/all', toolsController.list);
toolsRouter.post('/', toolsController.create);
toolsRouter.get('/', toolsController.show);
toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
