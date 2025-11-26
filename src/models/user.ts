import * as mongoose from 'mongoose'

import {softDeleteFields, Base, BaseProps} from './base'

export interface UserProps extends BaseProps {
  name: string
  email: string
  phone: string
  password: string
  full_address: string
  status: number
  designation: string
}

const userSchema = new mongoose.Schema<UserProps>({
  ...Base,
  ...softDeleteFields,
  name: {type: String, required: true},
  phone: {type: String, required: false, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  designation: {type: String},
  full_address: {type: String},
  status: {type: Number, default: 1},
})

export const User = mongoose.model<UserProps>('users', userSchema)
