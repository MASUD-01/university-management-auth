import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErroResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErroResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
