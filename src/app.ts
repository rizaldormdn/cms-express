require("dotenv").config();

import mysql, { Connection } from "mysql2";
import Router from "./Router";
import Server from "./Server";

const connection: Connection = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_USERPASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});

Server.run(
  Number(process.env.PORT),
  Router.run()
)