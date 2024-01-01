import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  username: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.pre<IUser>('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash

  next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as IUser
  return bcrypt.compare(candidatePassword, user.password)
}

export const UserModel = mongoose.model<IUser>('User', userSchema)
