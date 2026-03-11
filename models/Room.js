import mongoose from 'mongoose'

const lightSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    on: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
)

const roomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    occupied: {
      type: Boolean,
      default: false,
    },
    lights: {
      type: [lightSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Room = mongoose.model('Room', roomSchema)

export default Room
