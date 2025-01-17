import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/infra/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  username: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, username } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      username,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
