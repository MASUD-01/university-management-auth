/* eslint-disable no-console */
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/cacheAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/pagination';
import { academicSemesterFilterabalFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester created successFully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterabalFields);

    const paginationOptions = pick(req.query, paginationField);
    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retirieved successFully',
      data: result.data,
      meta: result.meta,
    });
    next();
  }
);
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SingleSemester retirieved successFully',
      data: result,
    });
    next();
  }
);
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
