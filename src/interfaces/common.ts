import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
export type IGenericErroResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
