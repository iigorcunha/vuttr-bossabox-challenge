import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import toolsRouter from '@modules/tools/infra/http/routes/tools.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use(ensureAuthenticated);
routes.use('/tools', toolsRouter);

export default routes;
