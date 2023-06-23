import { NextFunction, Response, Request } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHepers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      //verify token
      let verifyedUser: JwtPayload | null | string = null;

      verifyedUser = jwtHepers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifyedUser; //role,userId thake
      //role diye guard
      if (requiredRoles.length && !requiredRoles.includes(verifyedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
