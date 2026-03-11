import dotenv from 'dotenv'
import connectDB from './db/conn.js'
import Room from './models/Room.js'

dotenv.config()

async function seedRooms() {
  try {
    await connectDB()

    await Room.deleteMany({})

    const rooms = [
      {
        id: 'living-room',
        name: 'Living Room',
        occupied: false,
        lights: [
          { id: 'floor-lamp', name: 'Floor Lamp', on: true },
          { id: 'tv-backlight', name: 'TV Backlight', on: false },
        ],
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        occupied: false,
        lights: [{ id: 'counter-light', name: 'Counter Light', on: true }],
      },
      {
        id: 'bedroom',
        name: 'Bedroom',
        occupied: true,
        lights: [
          { id: 'bed-lamp', name: 'Bed Lamp', on: true },
          { id: 'ceiling-light', name: 'Ceiling Light', on: false },
        ],
      },
      {
        id: 'bathroom',
        name: 'Bathroom',
        occupied: false,
        lights: [{ id: 'vanity-light', name: 'Vanity Light', on: true }],
      },
    ]

    await Room.insertMany(rooms)

    console.log('Database seeded successfully')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedRooms()
