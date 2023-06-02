import { User } from './user.model'
export const findLastUserid = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generateId = async () => {
  const currentId = (await findLastUserid()) || (0).toString().padStart(5, '0')
  //increament 1
  const increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return increamentedId
}
