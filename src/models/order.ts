import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface OrderProps extends BaseProps {
  user_id: mongoose.Types.ObjectId
  total_amount: number
  shipping_address: string
  order_status: string
  payment_id: mongoose.Types.ObjectId
}

const orderSchema = new mongoose.Schema<OrderProps>(
  {
    ...Base,
    ...softDeleteFields,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    total_amount: {type: Number, required: true},
    shipping_address: {type: String, required: true},
    order_status: {type: String, required: true},
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'payments',
      required: true,
    },
  },
  {timestamps: true},
)

export const Order = mongoose.model<OrderProps>('orders', orderSchema)
