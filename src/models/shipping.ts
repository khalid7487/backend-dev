import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface ShippingProps extends BaseProps {
  order_id: mongoose.Types.ObjectId
  carrier: string
  tracking_number: string
  shipping_cost: number
  shipping_status: string
  estimated_delivery_date: Date
}

const shippingSchema = new mongoose.Schema<ShippingProps>(
  {
    ...Base,
    ...softDeleteFields,
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orders',
      required: true,
    },
    carrier: {type: String, required: true},
    tracking_number: {type: String, required: true},
    shipping_cost: {type: Number, required: true},
    shipping_status: {type: String, required: true},
    estimated_delivery_date: {type: Date, required: true},
  },
  {timestamps: true},
)

export const Shipping = mongoose.model<ShippingProps>('shippings', shippingSchema)
