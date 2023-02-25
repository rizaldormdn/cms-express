require("dotenv").config();

import mysql, { Connection } from "mysql2";
import UserRepository from "./domain/repository/UserRepository";
import UserRepositoryMySQL from "./infrastructure/database/mysql/UserRepository";
import Router from "./Router";
import Server from "./Server";

const connection: Connection = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_USERPASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});
const userRepository: UserRepository = new UserRepositoryMySQL(connection)

Server.run(
  Number(process.env.PORT),
  Router.run(userRepository)
)