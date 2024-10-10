import express from "express";
import { bookings, rooms, customers } from "../local-memory-db.js";
import { v4 } from 'uuid'

const bookingsRouter = express.Router();

const booked_rooms = [];
//2.  Book a Room
bookingsRouter.post('/:id', (req, res) => {

    const roomId = req.params.id;
    const bookingData = req.body;
    const room = rooms.find(room => room.roomId === roomId);
    const booking_Id = v4();
    const customer_Id = v4();
    console.log(room);
    if (room.booked_status === 'Vacant') {
        bookings.push({
            bookingId: booking_Id,
            customerId: customer_Id,
            roomId: roomId,
            ...bookingData
        })
        room.booked_status = 'Booked';
        booked_rooms.push(roomId)
        // set customer details
        customers.push({
            custId: customer_Id,
            roomId: roomId,
            ...bookingData
        })
        res.status(201).json({ msg: "Room booked Successfully" })
    } else {
        res.status(404).json({ msg: "Room Not available" })
    }

    res.status(201).json({ msg: "Room created Successfully" })
})

// 3. List all rooms with booked data
bookingsRouter.get('/', (req, res) => {
    if (bookings) {
        res.status(200).json({ bookings })
    } else {
        res.status(404).json({ msg: "No bookings found" })
    }

})

// 5. List how many times customer has booked room with below details
bookingsRouter.get('/booked-rooms', (req, res) => {
    if (bookings) {
        const bookedRooms = [];
        bookings.forEach(element => {
            if (booked_rooms.includes(element.roomId)) {
                bookedRooms.push({
                    ...element,
                    booked_status: rooms.find((el) => el.roomId === element.roomId).roomId
                })
            }
        });

        res.status(200).json({ bookedRooms })
    } else {
        res.status(404).json({ msg: "No bookings found" })
    }

})

export default bookingsRouter;