import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface CategoryProps extends BaseProps {
  category_name: string
}

const categorySchema = new mongoose.Schema<CategoryProps>(
  {
    ...Base,
    ...softDeleteFields,
    category_name: {type: String, required: true},
  },
  {timestamps: true},
)

export const Category = mongoose.model<CategoryProps>('categories', categorySchema)
