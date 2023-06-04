import { IGenericErrorMessage } from './error';

export type IGenericErroResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
