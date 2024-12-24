import ReservationRepository from "../../repositories/ReservationRepository";


interface BookingData {
    userId: number;
    showtimeId: number;
    seatIds: number[];
    totalPrice: number;
    status: string
}

export class ReservationService {
    static async createBooking(bookingData: BookingData) {
        try {
            const reservation = await ReservationRepository.createBooking(bookingData);
            return {
                success: true,
                data: reservation,
                message: "Booking created successfully"
            };
        } catch (error) {
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    }

    static async userReservation() {
        try {
            const reservation = await ReservationRepository.userReservation();
            const total = reservation.length;
        const totalPrice = reservation.reduce((sum, reservation) => sum + reservation.total_price, 0);
            return {
                success: true,
                data: reservation,
                total: total,
                totalPrice: totalPrice,
                message: "User reservation fetched successfully"
            };
        } catch (error) {
            throw new Error(`Failed to fetch user reservation: ${error.message}`);
        }
    }

    static async userReservationId(id: number) {
        try {
            const reservation = await ReservationRepository.getReservationById(id);

            return {
                success: true,
                data: reservation,
                message: "User reservation fetched successfully"
            };
        } catch (error) {
            throw new Error(`Failed to fetch user reservation: ${error.message}`);
        }
    }

    static async getReservationByUserId(userId: number) {
        try {
            const reservation = await ReservationRepository.getReservationByUserId(userId);
            return {
                success: true,
                data: reservation,
                message: "User reservation fetched successfully"
            };
        } catch (error) {
            throw new Error(`Failed to fetch user reservation: ${error.message}`);
        }
    }

    static async deleteReservation(reservationId: number) {
        try {
            const reservation = await ReservationRepository.deleteReservationById(reservationId);
            return {
                success: true,
                data: reservation,
                message: "Reservation deleted successfully"
            };
        } catch (error) {
            throw new Error(`Failed to delete reservation: ${error.message}`);
        }
    }

    static async updateReservationStatus(reservationId: number, status: string) {
        try {
            const reservation = await ReservationRepository.updateReservationStatus(reservationId, status);
            return {
                success: true,
                data: reservation,
                message: "Reservation status updated successfully"
            };
        } catch (error) {
            throw new Error(`Failed to update reservation status: ${error.message}`);
        }
    }

    static async getReservationStats() {
        return await ReservationRepository.getReservationStats();
    }
}