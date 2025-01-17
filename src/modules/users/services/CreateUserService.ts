import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    username,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address is already used');
    }

    const hashedPass = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPass,
    });

    return user;
  }
}

export default CreateUserService;
