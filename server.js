import express from "express";
import roomsRouter from "./Routers/rooms.js";
import bookingsRouter from "./Routers/bookings.js";
import customersRouter from "./Routers/customers.js";

const server = express()

server.use(express.json())


server.use('/rooms', roomsRouter)
server.use('/bookings', bookingsRouter)
server.use('/customers', customersRouter)

const PORT = 4500;

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})