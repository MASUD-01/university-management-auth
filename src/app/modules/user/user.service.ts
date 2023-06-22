import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import bcrypt from 'bcrypt';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //hash password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  // set role by backend for student
  user.role = 'student';

  //ei academic semister ta ache student er model er vitor refernce hisabe[15.8 video]
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //id generate from backend no need to provide id postman
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    //array
    //1st student create ekhon object dibo na karon rollback use korchi
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    //eikhane reference er jonne newly create kora student theke mongo _id niye user e deya hosse
    // ei id tar jonne postman theke deya dorkar nai
    user.student = newStudent[0]._id;

    //2nd user create ekhon object dibo na karon rollback use korchi
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();
    newUserAllData = newUser[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    //nested field reference hisabe ache tai populate obejct hoise
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      //eikhane student er reference gulake deya hosse
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
