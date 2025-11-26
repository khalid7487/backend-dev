import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface PaymentProps extends BaseProps {
  user_id: mongoose.Types.ObjectId
  product_id: mongoose.Types.ObjectId
  payment_method: string
  paid_amount: number
  product_price: number
  transaction_id: string
  quantity: number
}

const paymentSchema = new mongoose.Schema<PaymentProps>(
  {
    ...Base,
    ...softDeleteFields,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    payment_method: {type: String, required: true},
    paid_amount: {type: Number, required: true},
    product_price: {type: Number, required: true},
    transaction_id: {type: String, required: true},
    quantity: {type: Number, required: true},
  },
  {timestamps: true},
)

export const Payment = mongoose.model<PaymentProps>('payments', paymentSchema)
