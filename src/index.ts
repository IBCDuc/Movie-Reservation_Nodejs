import express from "express";
import routes from "./routes";
import { Movie } from "./entity/Movie";
import morgan from "morgan";
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from 'cors'
import { AppDataSource } from "./data-source";
const Port = 8000;
const app = express();

const allowCors = cors({
  origin: "http://localhost:3000",
  credentials: true,
});

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCors)

routes(app);

AppDataSource.initialize()
  .then(async () => {
    console.log("successfull connection!");
    const movieRepository = AppDataSource.getRepository(Movie);
  })
  .catch((error) => console.log(error));

app.listen(Port, () => {
  console.log(`listening on ${Port}`);
});
