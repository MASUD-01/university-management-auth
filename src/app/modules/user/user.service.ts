import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import { generateId } from './user.utils';
import { IUser } from './user.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated increamental id
  const id = await generateId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const userService = {
  createUser,
};
