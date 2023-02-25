import express, { Express } from "express";
import request from "supertest";
import UserRepository from "./domain/repository/UserRepository";
import Middleware from "./Middleware";
import Router from "./Router";

describe("Handler", () => {
	const userRepository: UserRepository = {
    getUser: jest.fn(),
    saveAuthor: jest.fn(),
    updateUser: jest.fn(),
    deleteAuthor: jest.fn()
  }
	let app: Express = express();

	app.use(express.json())
	app.use(Middleware.cors);
	app.use("/", Router.run(userRepository));

	test("GET /v1/ping 200", async () => {
		let res = await request(app).get("/ping");

		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toBe("success");
	})
})
