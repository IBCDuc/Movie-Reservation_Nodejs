import { Application } from 'express-serve-static-core';
import homeRouter from './home';
import adminRouter from './admin'
import apiRouter from './api'
import movieRouter from './movies'
import showtimeRouter from './showtime'
import cinemaRouter from './cinema'
import seatRouter from './seat'
import reservationRouter from './reservation'
import authRouter from './auth'
import { authMiddlewareUser, authMiddlewareAdmin } from '../jwt';

export default function route(app: Application) {
  app.use("/api/auth", authRouter);
  

  app.use("/admin", adminRouter);
  app.use("/api/show-time", showtimeRouter);
  app.use("/api/movies", movieRouter);
  app.use("/api/cinema", cinemaRouter);
  app.use("/api/seat", seatRouter);
  app.use("/api/reservation", reservationRouter);
  app.use("/api", apiRouter);
  app.use("/", homeRouter);
}


