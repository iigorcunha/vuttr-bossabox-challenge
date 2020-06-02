import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ToolsRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IToolsRepository>(
  'ToolsRepository',
  ToolsRepository
);
