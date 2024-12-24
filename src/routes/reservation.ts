import express from "express";

import { ReservationController } from "../app/controller/ReservationController";
const router = express.Router();

router.delete('/delete/:id', ReservationController.deleteReservation);
router.post('/booking', ReservationController.createBooking);
router.get('/get', ReservationController.userReservation);
router.get('/get/:id', ReservationController.userReservationId);
router.get('/get/user/:userId', ReservationController.getReservationByUserId);
router.get('/stats', ReservationController.getStats);
router.put('/update/status/:id', ReservationController.updateReservation);

export default router;
