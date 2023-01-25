import express, { Application, Router as ExpressRouter } from "express";
import request from "supertest";
import mysql, { Connection } from "mysql2";
import Router from "../Router";

describe("HTTP handler for /ping", () => {
	describe("Resolved Handler", () => {
		const app: Application = express();
		const connection: Connection = mysql.createConnection({
			host: "localhost",
		});
		const router: ExpressRouter = Router(connection);
		app.use(express.json());
		app.use("/", router);

		test("GET /v1/category 200", async () => {
			const res = await request(app).get("/v1/ping").query({ name: "Article" });

			expect(res.header["content-type"]).toBe(
				"application/json; charset=utf-8"
			);
			expect(res.statusCode).toBe(200);
			expect(res.body.status).toBe("success");
			expect(res.body.message).toBe("Category successfully retrieved");
			expect(res.body.data).not.toBeNull();
		});

		test("GET /v1/ping 200", async () => {
			const res = await request(app).post("/v1/ping").send({ ping: "alive" });

			expect(res.header["content-type"]).toBe(
				"application/json; charset=utf-8"
			);
			expect(res.statusCode).toBe(200);
			expect(res.body.status).toBe("success");
			expect(res.body.message).toBe("Category successfully retrieved");
			expect(res.body.data).not.toBeNull();
		});
	});
});
