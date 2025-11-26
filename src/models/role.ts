import * as mongoose from 'mongoose'

import {Base, BaseProps} from './base'

export enum RoleEnum {
  Admin = 'admin',
  User = 'user',
  Stuff = 'stuff',
}

export interface RoleProps extends BaseProps {
  user_id: mongoose.Schema.Types.ObjectId
  role: RoleEnum
  permission: string[]
}

const roleSchema = new mongoose.Schema<RoleProps>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  role: {type: String},
  permission: {type: [String]},
  ...Base,
})

export const Role = mongoose.model<RoleProps>('roles', roleSchema)
