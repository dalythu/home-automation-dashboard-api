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

// CREATE light in a room
router.post('/:roomId/lights', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Light name is required' })
    }

    const newLight = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      on: false,
    }

    room.lights.push(newLight)
    await room.save()

    res.status(201).json(room)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add light' })
  }
})

// UPDATE / TOGGLE light in a room
router.patch('/:roomId/lights/:lightId', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    const light = room.lights.find((l) => l.id === req.params.lightId)

    if (!light) {
      return res.status(404).json({ error: 'Light not found' })
    }

    if (req.body && typeof req.body.on === 'boolean') {
      light.on = req.body.on
    } else {
      light.on = !light.on
    }

    await room.save()

    res.json(room)
  } catch (error) {
    console.error('Failed to update light:', error)
    res.status(500).json({ error: 'Failed to update light' })
  }
})

// DELETE light from a room
router.delete('/:roomId/lights/:lightId', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    room.lights = room.lights.filter((l) => l.id !== req.params.lightId)

    await room.save()

    res.json(room)
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove light' })
  }
})

export default router
