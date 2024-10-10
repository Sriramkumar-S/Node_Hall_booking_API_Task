import express from "express";
import { bookings, customers } from "../local-memory-db.js";
import { v4 } from 'uuid'

const customersRouter = express.Router();

// Create a Customer
customersRouter.post('/', (req, res) => {
    const customerData = req.body;
    customers.push({
        customerId: v4(),
        ...customerData
    })
    res.status(201).json({ msg: "Customer created Successfully" })
})

// Get all customers
customersRouter.get('/', (req, res) => {
    if (customers) {
        res.status(200).json({ customers })
    } else {
        res.status(404).json({ msg: "No Customers found" })
    }

})

// 4. List all customers with booked data
customersRouter.get('/booked-rooms', (req, res) => {
    if (customers) {

        const customer_rooms_booked = [];

        customers.forEach(element => {
            bookings.forEach(el => {
                if (element.custId === el.customerId) {
                    customer_rooms_booked.push({
                        ...element,
                        roomId: el.roomId
                    })
                }
            });
        });

        res.status(200).json({ customer_rooms_booked });
    } else {
        res.status(404).json({ msg: "No Customers found" })
    }

})

export default customersRouter;