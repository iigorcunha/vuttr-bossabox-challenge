import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import toolsRouter from '@modules/tools/infra/http/routes/tools.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tools', toolsRouter);

export default routes;
