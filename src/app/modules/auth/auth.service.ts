/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IloginiUser,
} from './auth.interface';
import { User } from '../user/user.model';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHepers } from '../../../helpers/jwtHelpers';
const loginUser = async (payload: IloginiUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //creating instance of user
  //   const user = new User(); //instance method create
  const isUserExist = await User.isUserExist(id);
  //   const isUserExist = await User.findOne(
  //     { id },
  //     { id: 1, password: 1, needsPasswordChange: 1 }
  //   ).lean();

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token and refresh token
  const { id: userid, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHepers.createToken(
    { userid, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHepers.createToken(
    { userid, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  console.log({ accessToken, refreshToken, needsPasswordChange });
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verifytoken
  let verifyToken: JwtPayload | null | string = null;

  try {
    verifyToken = jwtHepers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifyToken;
  //tumi delete hye gso kintu tumar refresh token ase
  //checking deleted users refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'uSER DOES NOT EXIST');
  }

  //generate new token
  const newAccessToken = jwtHepers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

/* User.amarMethod --> StaticRange
const user= new User()
user.amarMethod  */ //this is call instance medthod
