import express, { Express } from "express";
import request from "supertest";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import UserRepository from "../../domain/repository/UserRepository";
import Middleware from "../../Middleware";
import Router from "../../Router";
import Status from "../../Status";
import { author } from "../../testdata"
import AdministratorService from "../../application/service/AdministratorService";
import ConfirmationService from "../../application/service/ConfirmationService";

describe("UserHandler", () => {
  const userRepository: UserRepository = {
    getUser: jest.fn(),
    saveAuthor: jest.fn(),
    updateUser: jest.fn(),
    deleteAuthor: jest.fn()
  }
  const confirmationService: ConfirmationService = {
    sendConfirmation: jest.fn()
  } 
  const administratorService: AdministratorService = new AdministratorService(userRepository, confirmationService)
	const app: Express = express();

	app.use(express.json())
	app.use(Middleware.cors);
	app.use("/", Router.run(userRepository, administratorService));

	test("POST /v1/login 200", async () => {
    userRepository.getUser = jest.fn().mockResolvedValueOnce(author)

    let data = {
      email: 'author@example.com',
      password: 'author123'
    }
		let res = await request(app).post("/v1/login").send(data);

    expect(res.statusCode).toBe(200);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.status).toBe(Status.Success);
    expect(res.body.data.access_token).toBeDefined();
    expect(res.body.data.refresh_token).toBeDefined();
	})

  test("POST /v1/login 404", async () => {
    userRepository.getUser = jest.fn().mockResolvedValueOnce(author)

    let data = {
      email: 'author@example.com',
      password: 'wrongpassword'
    }
		let res = await request(app).post("/v1/login").send(data);

    expect(res.statusCode).toBe(404);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.status).toBe(Status.Fail);
    expect(res.body.message).toBe("user not found");
	})

  test("POST /v1/login 500", async () => {
    userRepository.getUser = jest.fn().mockRejectedValueOnce(new Error("failed to login"))

    let data = {
      email: 'author@example.com',
      password: 'author123'
    }
		let res = await request(app).post("/v1/login").send(data);

    expect(res.statusCode).toBe(500);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.status).toBe(Status.Error);
    expect(res.body.message).toBe("failed to login");
	})

  test('GET /v1/me 200', async () => {
    sinon.stub(jwt, 'verify');

    let res = await request(app).get('/v1/me');

    sinon.restore();

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe('success');
    expect(res.body.data).toBeDefined();
  })

  test('GET /v1/me 403', async () => {
    sinon.stub(Middleware, 'authentication').rejects();

    let res = await request(app).get('/v1/me');

    sinon.restore();

    expect(res.statusCode).toBe(403);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('failed to verify the token');
  })
})