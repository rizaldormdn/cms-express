require("dotenv").config();

import Server from "./presentation/http/Server";
import Router from "./presentation/http/Router";
import { Router as ExpressRouter } from "express";
import mysql, { Connection } from "mysql2";

const connection: Connection = mysql.createConnection({
	user: process.env.DB_USERNAME,
	password: process.env.DB_USERPASS,
	database: process.env.DB_NAME,
});
const router: ExpressRouter = Router();
const server: Server = new Server(router);

server.run(Number(process.env.SERVER_PORT));
