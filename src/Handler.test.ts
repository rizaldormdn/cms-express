import express, { Express } from "express";
import request from "supertest";
import Middleware from "./Middleware";
import Router from "./Router";
import {
  userRepository,
  imageRepository,
  articleRepository,
  userService,
  imageService,
  articleService,
  administratorService,
  resetPasswordService
} from "./testdata"

describe("Handler", () => {
	let app: Express = express();

	app.use(express.json())
	app.use(Middleware.cors);
	app.use("/", Router.run(
    userRepository,
    imageRepository,
    articleRepository,
    userService,
    imageService,
    articleService,
    administratorService,
    resetPasswordService
  ));

	test("GET /v1/ping 200", async () => {
		let res = await request(app).get("/ping");

		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toBe("success");
	})
})
