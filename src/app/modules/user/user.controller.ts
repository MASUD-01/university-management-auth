import httpStatus from 'http-status';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { userService } from './user.service';
import catchAsync from '../../../shared/cacheAsync';
import sendResponse from '../../../shared/sendResponse';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successFully',
      data: result,
    });
    next();
  }
);

export const userController = {
  createUser,
};
