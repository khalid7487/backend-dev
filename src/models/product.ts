import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface ProductProps extends BaseProps {
  user_id: mongoose.Types.ObjectId
  category_id: mongoose.Types.ObjectId
  sku: string
  name: string
  price: number
  discount_amount: number
  discount_percentage: number
  descriptions: string
  product_image: string[]
  product_tag: string[]
  quantity: number
  size: string[]
  color: string[]
  purchase_price: number
  status: number
}

const productSchema = new mongoose.Schema<ProductProps>(
  {
    ...Base,
    ...softDeleteFields,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    sku: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    discount_amount: {type: Number, default: 0},
    discount_percentage: {type: Number, default: 0},
    descriptions: {type: String},
    product_image: {type: [String], default: []},
    product_tag: {type: [String], default: []},
    quantity: {type: Number, default: 0},
    size: {type: [String], default: []},
    color: {type: [String], default: []},
    purchase_price: {type: Number},
    status: {type: Number, default: 1},
  },
  {timestamps: true},
)

export const Product = mongoose.model<ProductProps>('products', productSchema)

//
// Example usage:
// 1. Features shop category // fashion category electronics category
//  category model subcategory model
// 2. Product attributes: size/storage, color, price, discount, description, images, tags ->256gb
// 2. Product attributes: size/storage, color, price, discount, description, images, tags ->512gb
