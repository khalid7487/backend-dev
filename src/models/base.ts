export type BaseProps = {
  is_deleted: boolean
  deleted_at: Date
  created_at: Date
  updated_at: Date
  created_by: string
  updated_by: string
}

export const softDeleteFields = {
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}

export const Base = {
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    default: null,
  },
  updated_by: {
    type: String,
    default: null,
  },
}
