import { z } from 'zod';
import { bloodGroup } from './user.constant';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string({}).optional(),
        lastName: z.string({
          required_error: 'First name is required',
        }),
      }),
      dateOfBirst: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'zender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
        profileImage: z.string().optional(),
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
