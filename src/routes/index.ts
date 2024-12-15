import { Application } from 'express-serve-static-core';
import homeRouter from './home';
import adminRouter from './admin'
import apiRouter from './api'
import movieRouter from './movies'
import showtimeRouter from './showtime'

export default function route(app: Application) {
  app.use("/admin", adminRouter)
  app.use("/api/show-time", showtimeRouter )
  app.use("/api/movies", movieRouter )
  app.use("/api",apiRouter)
  app.use("/", homeRouter);
}


