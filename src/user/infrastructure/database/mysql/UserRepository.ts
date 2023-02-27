require("dotenv").config();

import { Connection } from "mysql2";
import AuthorSnapshot, { AuthorSnapshots } from "../../../application/valueobject/AuthorSnapshot";
import Author from "../../../domain/entity/Author";
import User from "../../../domain/entity/User";
import * as UserRepositoryInterface from "../../../domain/repository/UserRepository";
import Email from "../../../domain/valueobject/Email";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";
import ResetPasswordToken from "../../../domain/valueobject/ResetPasswordToken";

export default class UserRepository implements UserRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public getAuthors(): Promise<AuthorSnapshots> {
    return new Promise<AuthorSnapshots>((resolve, reject) => {
      this._connection.query(
        "SELECT email, first_name, last_name FROM users WHERE is_administrator IS NOT TRUE LIMIT ?",
        [Number(process.env.LIMIT_AUTHORS)],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get authors'));
          }
          if (result.length > 0) {
            let authorSnapshots: AuthorSnapshots = []

            for (let entry of result) {
              authorSnapshots.push(new AuthorSnapshot(
                new Name(entry.first_name, entry.last_name).full(),
                entry.email
              ))
            }

            resolve(authorSnapshots);
          }

          reject(new Error('user not found'))
        }
      )
    })
  }

  public getUser(email: Email): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._connection.query(
        "SELECT first_name, last_name, salt, hashed_password, token, token_expiry, is_administrator FROM users WHERE email = ? LIMIT 1",
        [email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get an user'));
          }
          if (result.length > 0) {
            resolve(
              new User(
                email,
                new Name(result[0].first_name, result[0].last_name),
                result[0].is_administrator,
                new Password(result[0].salt, result[0].hashed_password),
                new ResetPasswordToken(result[0].token, new Date(result[0].token_expiry))
              )
            );
          }

          reject(new Error('user not found'))
        }
      );
    });
  }

  public getUserByToken(token: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._connection.query(
        "SELECT email, first_name, last_name, salt, hashed_password, token_expiry, is_administrator FROM users WHERE token = ? LIMIT 1",
        [token],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get an user by token'));
          }
          if (result.length > 0) {
            resolve(
              new User(
                new Email(result[0].email),
                new Name(result[0].first_name, result[0].last_name),
                result[0].is_administrator,
                new Password(result[0].salt, result[0].hashed_password),
                new ResetPasswordToken(token, new Date(result[0].token_expiry))
              )
            );
          }

          reject(new Error('user not found'))
        }
      );
    });
  }

  public saveAuthor(author: Author): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "INSERT INTO users (email, first_name, last_name, salt, hashed_password, token, token_expiry) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          author.email.string(),
          author.name.first,
          author.name.last,
          author.password!.salt,
          author.password!.hashedPassword,
          author.resetPasswordToken?.token,
          author.resetPasswordToken?.tokenExpiry
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed save an author'));
          }
          
          resolve(result)
        }
      );
    });
  }

  public updateUser(user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ?, token = ?, token_expiry = ? WHERE email = ?",
        [
          user.name.first,
          user.name.last,
          user.password!.salt,
          user.password!.hashedPassword,
          user.resetPasswordToken?.token,
          user.resetPasswordToken?.tokenExpiry,
          user.email.string(),
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed update an user'));
          }

          resolve(result);
        }
      );
    });
  }

  public deleteAuthor(email: Email): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "DELETE FROM users WHERE is_administrator IS NOT TRUE AND email = ?",
        [email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed delete an author'));
          }

          resolve(result);
        }
      );
    });
  }
}
