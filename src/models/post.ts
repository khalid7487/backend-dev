import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface PostProps extends BaseProps {
  title: string
  body: string
  user_id: mongoose.Types.ObjectId
  status: string
}

const postSchema = new mongoose.Schema<PostProps>(
  {
    ...Base,
    ...softDeleteFields,
    title: {type: String, required: true},
    body: {type: String, required: true},
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {type: String, required: true},
  },
  {timestamps: true},
)

export const Post = mongoose.model<PostProps>('posts', postSchema)
