import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import { deserializeUser } from "./middlewares";
import routes from "./routes";
import path from "path";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(routes);
app.use(errorMiddleware);
app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
});
