import express, { Express, Router as ExpressRouter } from 'express';
import Router from "../Router";
import request from 'supertest';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import Middleware from './Middleware';
import mysql, { Connection } from "mysql2";


describe('HTTP handler', () => {
  describe('resolved handler', () => {
    const connection: Connection = mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_USERPASS,
        database: process.env.DB_NAME,
    });

    const app: Express = express();

    app.use(express.json());
    app.use('/', Router(connection));
  
    test('GET v2/me 200', async () => {
      sinon.stub(jwt, 'verify');
      sinon.restore();
      const res = await request(app).get('/v2/me');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('success get author');
      expect(res.body.data).toBeDefined();
    })

    test('GET v2/me 403', async () => {
      sinon.stub(Middleware, 'authentication').rejects();
      const res = await request(app).get('/v2/me');
      sinon.restore();
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(403);
      expect(res.body.status).toBe('error');
    })
  })
})