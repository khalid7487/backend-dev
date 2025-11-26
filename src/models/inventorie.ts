import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface InventoryProps extends BaseProps {
  product_id: mongoose.Types.ObjectId
  size: string
  color: string
  stock_quantity: number
  purchase_price: number
}

const inventorySchema = new mongoose.Schema<InventoryProps>(
  {
    ...Base,
    ...softDeleteFields,
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    size: {type: String, required: true},
    color: {type: String, required: true},
    stock_quantity: {type: Number, required: true, default: 0},
    purchase_price: {type: Number, required: true},
  },
  {timestamps: true},
)

export const Inventory = mongoose.model<InventoryProps>('inventories', inventorySchema)
