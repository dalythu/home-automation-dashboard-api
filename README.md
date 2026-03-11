# Smart Home Automation Dashboard API

This repository contains the backend API for the Smart Home Automation Dashboard.

The API manages rooms and lights and stores the data in MongoDB. The frontend dashboard communicates with this API to read and update room and light states.

---

## Related Repository

Frontend  
https://github.com/dalythu/home-automation-dashboard-ui

---

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose

---

## Setup

Clone the repository:

```bash
git clone https://github.com/dalythu/home-automation-dashboard-api.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Seed the database with sample rooms and lights:

```bash
node seed.js
```

Start the development server:

```bash
npm run dev
```

The API will run locally on:

```text
http://localhost:5001
```

---

## API Routes

### Rooms

GET `/api/rooms`  
Returns all rooms.

GET `/api/rooms/:roomId`  
Returns a single room.

### Lights

POST `/api/rooms/:roomId/lights`  
Adds a new light to a room.

PATCH `/api/rooms/:roomId/lights/:lightId`  
Updates a light, such as toggling it on or off.

DELETE `/api/rooms/:roomId/lights/:lightId`  
Removes a light from a room.

---

## Project Structure

```text
db/
  conn.js

models/
  Room.js

routes/
  rooms.js

seed.js
server.js
```