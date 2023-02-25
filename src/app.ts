require("dotenv").config();

import mysql, { Connection } from "mysql2";
import nodemailer from "nodemailer";
import AdministratorService from "./application/service/AdministratorService";
import ConfirmationService from "./application/service/ConfirmationService";
import UserRepository from "./domain/repository/UserRepository";
import UserRepositoryMySQL from "./infrastructure/database/mysql/UserRepository";
import EmailConfirmationService from "./infrastructure/service/confirmation/EmailConfirmationService";
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
const emailConfirmationService: ConfirmationService = new EmailConfirmationService(
  nodemailer.createTransport({
    host: process.env.EMAIL_TRANSPORT_HOST,
    port: Number(process.env.EMAIL_TRANSPORT_PORT),
    service: process.env.EMAIL_TRANSPORT_SERVICE,
    auth: {
      user: process.env.EMAIL_TRANSPORT_USER,
      pass: process.env.EMAIL_TRANSPORT_PASS
    }
  }),
  {
    from: process.env.EMAIL_SENDER
  },
)
const administratorService: AdministratorService = new AdministratorService(userRepository, emailConfirmationService)

Server.run(
  Number(process.env.PORT),
  Router.run(userRepository, administratorService)
)