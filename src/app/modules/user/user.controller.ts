import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import catchAsync from '../../../shared/cacheAsync';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    //req.body asbe
    // {
    //   password:'',
    //   student: {
    //   }
    // }
    const { student, ...userData /* eta mane password */ } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createStudent,
};
