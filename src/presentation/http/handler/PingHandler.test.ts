import express, { Express } from "express";
import request from "supertest";
import Router from "../Router";

describe("HTTP handler for /ping", () => {
	let app: Express = express();

	app.use(express.json());
	app.use("/", Router());

	test("GET /v1/ping 200", async () => {
		let res = await request(app).get("/v1/ping");

		expect(res.header["content-type"]).toBe(
			"application/json; charset=utf-8"
		);
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toBe("success");
		expect(res.body.message).toBe("server is alive");
	});
});
