import express from "express";
import { rooms } from "../local-memory-db.js";
import { v4 } from 'uuid'

const roomsRouter = express.Router();

//1.  Create a Room
roomsRouter.post('/', (req, res) => {
    const roomData = req.body;
    rooms.push({
        roomId: v4(),
        booked_status: "Vacant",
        ...roomData
    })
    res.status(201).json({ msg: "Room created Successfully" })
})

// Get all Rooms
roomsRouter.get('/', (req, res) => {
    if (rooms) {
        res.status(200).json({ rooms })
    } else {
        res.status(404).json({ msg: "No rooms found" })
    }

})

export default roomsRouter;