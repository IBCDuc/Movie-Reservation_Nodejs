import { Request, Response } from "express";
import { ReservationService } from "../services/ReservationService";


export class ReservationController {
    static async createBooking(req: Request, res: Response) {
        try {
            const bookingData = req.body;
            const result = await ReservationService.createBooking(bookingData);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    static async userReservation(req: Request, res: Response) {
        try {
            const result = await ReservationService.userReservation();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async userReservationId(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const result = await ReservationService.userReservationId(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getReservationByUserId(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const result = await ReservationService.getReservationByUserId(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteReservation(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const result = await ReservationService.deleteReservation(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    static async updateReservation(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const reservationData = req.body;
        try {
            const result = await ReservationService.updateReservationStatus(id, reservationData.status);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getStats(req: Request, res: Response) {
    try {
        const stats = await ReservationService.getReservationStats();
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}   
}