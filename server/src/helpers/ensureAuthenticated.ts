import { NextFunction, Request, Response} from 'express';
import { verify } from 'jsonwebtoken';
import auth from './auth'

interface JWTtoken {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.json({"error":"JWT token is missing"});
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as JWTtoken;
    req.user = {
      email: sub,
    };

    return next();
  } catch {
    res.json({"error":"Invalid JWT token"});
    return;
  }
}