import express from 'express'
import Room from '../models/Room.js'

const router = express.Router()

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' })
  }
})

// GET single room
router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' })
  }
})

// CREATE room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body)
    const savedRoom = await room.save()
    res.status(201).json(savedRoom)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create room' })
  }
})

// UPDATE room
router.patch('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { id: req.params.roomId },
      req.body,
      { new: true },
    )

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update room' })
  }
})

// DELETE room
router.delete('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ id: req.params.roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json({ message: 'Room deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete room' })
  }
})

export default router
