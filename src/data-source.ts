import { DataSource } from "typeorm";
import { User } from "./entity/Users";
import { Admin } from "./entity/Admin";
import { Movie } from "./entity/Movie";
import { Report } from "./entity/Report";
import { Reservation } from "./entity/Reservation";
import { SeatSlot } from "./entity/Seat_slot";
import { ShowtimeDate } from "./entity/Showtime_date";
import { ShowtimeHours } from "./entity/Showtime_hours";
import * as dotenv from 'dotenv'

const result = dotenv.config()

//debug test
if (result.error) {
  throw result.error
}

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true', 
  logging: process.env.DB_LOGGING === 'true', 
  entities: [User, Admin, Movie, Report, Reservation, SeatSlot, ShowtimeDate, ShowtimeHours],
  subscribers: [],
  migrations: [],
  extra: {
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', 
  },
  options: {
    enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true', 
  },
});

