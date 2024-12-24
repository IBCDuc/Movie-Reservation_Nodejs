import { AppDataSource as dataSource } from "../data-source";
import { Reservation } from "../entity/Reservation";
import { SeatSlot } from "../entity/Seat_slot";
interface BookingData {
    userId: number;
    showtimeId: number;
    seatIds: number[];
    totalPrice: number;
}
export default class ReservationRepository {
    static async createBooking(bookingData: BookingData) {
        return await dataSource.transaction(async (transactionalEntityManager) => {
            // Update seat status to booked
            await transactionalEntityManager
                .createQueryBuilder()
                .update(SeatSlot)
                .set({ status: 'booked' })
                .whereInIds(bookingData.seatIds)
                .execute();

            // Create reservations
            const reservations = bookingData.seatIds.map(seatId => {
                const reservation = new Reservation();
                reservation.User_id = bookingData.userId;
                reservation.Slot_id = seatId;
                reservation.status = 'pending';
                reservation.total_price = bookingData.totalPrice / bookingData.seatIds.length;
                return reservation;
            });

            return await transactionalEntityManager.save(Reservation, reservations);
        });
    }
    static async userReservation() {
        const res = await dataSource
            .getRepository(Reservation)
            .createQueryBuilder("reservation")
            .leftJoinAndSelect("reservation.seatSlot", "seatSlot")
            .leftJoinAndSelect("reservation.user", "user")
            .leftJoinAndSelect("seatSlot.cinemaRoom", "cinemaRoom")
            .leftJoinAndSelect("seatSlot.showtimeHours", "showtimeHours")
            .leftJoinAndSelect("showtimeHours.showtimeDate", "showtimeDate")
            .leftJoinAndSelect("showtimeDate.movie", "movie")
            .select([
                "reservation.Reservation_id",
                "reservation.User_id", 
                "reservation.status",
                "reservation.time_reservation",
                "reservation.total_price",
                "user.user_name",
                "user.phone",
                "user.email", 
                "seatSlot.seat_number",
                "seatSlot.row",
                "seatSlot.type",
                "cinemaRoom.name",
                "showtimeHours.Movie_hour",
                "showtimeDate.Movie_date", 
                "movie.Movie_name",
                "movie.img_url"
            ])
            .orderBy("reservation.time_reservation", "DESC")
            .getMany();
        return res;
    }
    static async getReservationById(reservationId: number) {
        const reservation = await dataSource
            .getRepository(Reservation)
            .createQueryBuilder("reservation")
            .leftJoinAndSelect("reservation.seatSlot", "seatSlot")
            .leftJoinAndSelect("reservation.user", "user")
            .leftJoinAndSelect("seatSlot.cinemaRoom", "cinemaRoom")
            .leftJoinAndSelect("seatSlot.showtimeHours", "showtimeHours")
            .leftJoinAndSelect("showtimeHours.showtimeDate", "showtimeDate")
            .leftJoinAndSelect("showtimeDate.movie", "movie")
            
            .select([
                "reservation.Reservation_id as id",
                "movie.img_url as logo",
                "movie.Movie_name as name",
                "cinemaRoom.name as cinemaName",
                "seatSlot.row as row",
                "seatSlot.seat_number as seatNumber",
                "showtimeHours.Movie_hour",
                "showtimeDate.Movie_date",
                "user.user_name as display_name",
                "user.phone as phone_number",
                "user.email as email",
                "reservation.total_price as cost"
            ])
            .where("reservation.Reservation_id = :reservationId", { reservationId })
            .getRawOne();
    
        return {
            ...reservation,
            seat: `${reservation.row}${reservation.seatNumber}`,
            user: {
                display_name: reservation.display_name,
                phone_number: reservation.phone_number,
                email: reservation.email
            }
        };
    }
    static async getReservationByUserId(userId: number) {
        const reservations = await dataSource
            .getRepository(Reservation)
            .createQueryBuilder("reservation")
            .leftJoinAndSelect("reservation.seatSlot", "seatSlot")
            .leftJoinAndSelect("reservation.user", "user")
            .leftJoinAndSelect("seatSlot.cinemaRoom", "cinemaRoom")
            .leftJoinAndSelect("seatSlot.showtimeHours", "showtimeHours")
            .leftJoinAndSelect("showtimeHours.showtimeDate", "showtimeDate")
            .leftJoinAndSelect("showtimeDate.movie", "movie")
            .select([
                "reservation.Reservation_id as id",
                "reservation.status as status",
                "movie.img_url as logo",
                "movie.Movie_name as name",
                "cinemaRoom.name as cinemaName",
                "seatSlot.row as row",
                "seatSlot.seat_number as seatNumber",
                "showtimeHours.Movie_hour as hour",
                "showtimeDate.Movie_date as date",
                "user.user_name as display_name",
                "user.phone as phone_number",
                "user.email as email",
                "reservation.total_price as cost"
            ])
            .where("reservation.User_id = :userId", { userId })
            .getRawMany();
    
        return reservations.map(reservation => ({
            id: reservation.id,
            status: reservation.status,
            logo: reservation.logo,
            name: reservation.name,
            cinemaName: reservation.cinemaName,
            date: reservation.date,
            hour: reservation.hour,
            seat: `${reservation.row}${reservation.seatNumber}`,

            user: {
                display_name: reservation.display_name,
                phone_number: reservation.phone_number,
                email: reservation.email
            },
            cost: reservation.cost
        }));
    }

    static async deleteReservationById(reservationId: number) {
        return await dataSource.transaction(async (transactionalEntityManager) => {
            // Get reservation with seat info before deletion
            const reservation = await transactionalEntityManager
                .getRepository(Reservation)
                .findOne({
                    where: { Reservation_id: reservationId },
                    relations: ['seatSlot']
                });
    
            if (!reservation) {
                throw new Error('Reservation not found');
            }
    
            // Update seat status back to available
            await transactionalEntityManager
                .createQueryBuilder()
                .update(SeatSlot)
                .set({ status: 'booked' })
                .where("slot_id = :seatId", { seatId: reservation.Slot_id })
                .execute();
    
            // Delete the reservation
            await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Reservation)
                .where("Reservation_id = :id", { id: reservationId })
                .execute();
    
            return { success: true, message: 'Reservation deleted successfully' };
        });
    }

    static async updateReservationStatus(reservationId: number, status: string) {
        const result = await dataSource
            .createQueryBuilder()
            .update(Reservation)
            .set({ status: status })
            .where("Reservation_id = :id", { id: reservationId })
            .execute();

        if (result.affected === 0) {
            throw new Error('Reservation not found');
        }

        return {
            success: true,
            message: 'Reservation status updated successfully'
        };
    }

    static async getReservationStats() {
        const stats = await dataSource
            .getRepository(Reservation)
            .createQueryBuilder('reservation')
            .select('reservation.status', 'status')
            .addSelect('COUNT(reservation.Reservation_id)', 'count')
            .groupBy('reservation.status')
            .getRawMany();
    
        const result = {
            pending: 0,
            complete: 0,
            cancled: 0,
            total: 0
        };
    
        stats.forEach(stat => {
            switch(stat.status) {
                case 'pending':
                    result.pending = parseInt(stat.count);
                    break;
                case 'complete':
                    result.complete = parseInt(stat.count);
                    break;
                default:
                    result.cancled += parseInt(stat.count);
            }
        });
    
        result.total = result.pending + result.complete + result.cancled;
    
        return result;
    }

}
