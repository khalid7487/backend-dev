import * as mongoose from 'mongoose'

import {Base, BaseProps, softDeleteFields} from './base'

export interface TestimonialProps extends BaseProps {
  user_id: mongoose.Types.ObjectId
  product_id: mongoose.Types.ObjectId
  rating: number
  comment: string
}

const testimonialSchema = new mongoose.Schema<TestimonialProps>(
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
    rating: {type: Number, required: true},
    comment: {type: String},
  },
  {timestamps: true},
)

export const Testimonial = mongoose.model<TestimonialProps>('testimonials', testimonialSchema)
