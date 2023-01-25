require('dotenv').config({})
import Server from "./delivery/http/Server";
import Router from "./delivery/http/Router";
import { Router as ExpressRouter } from "express";
import mysql, { Connection } from "mysql";

const connection: Connection = mysql.createConnection(String(process.env.DB_URL));
const router: ExpressRouter = Router(connection);
const server: Server = new Server(router);

server.run(Number(process.env.SERVER_PORT));

// console.log(process.env.DB_URL);
