import config from '../../../config'
import { User } from './user.model'
import { generateId } from './user.utils'
import { IUser } from './users.interface'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated increamental id
  // default password
  const id = await generateId()
  user.id = id
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}
