import { Connection } from "mysql2";
import Administrator from "../../../domain/entity/Administrator";
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

  public getUser(email: Email): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._connection.query(
        "SELECT first_name, last_name, salt, hashed_password, token, token_expiry, is_administrator FROM users WHERE email = ? LIMIT 1",
        [email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(err);
          }
          if (result.length > 0) {
            resolve(
              new Administrator(
                email,
                new Name(result[0].first_name, result[0].last_name),
                new Password(result[0].salt, result[0].hashed_password),
                new ResetPasswordToken(result[0].token, new Date(result[0].token_expiry))
              )
            );
          }
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

            reject(err);
          }
          if (result.length > 0) {
            resolve(
              new Administrator(
                new Email(result[0].email),
                new Name(result[0].first_name, result[0].last_name),
                new Password(result[0].salt, result[0].hashed_password),
                new ResetPasswordToken(token, new Date(result[0].token_expiry))
              )
            );
          }
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
          String(author.resetPasswordToken?.token),
          author.resetPasswordToken?.tokenExpiry
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(err);
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
          String(user.resetPasswordToken?.token),
          user.resetPasswordToken?.tokenExpiry,
          user.email.string(),
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(err);
          }

          resolve(result);
        }
      );
    });
  }

  public deleteAuthor(email: Email): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "DELETE FROM users WHERE is_administrator = FALSE AND email = ?",
        [email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(err);
          }

          resolve(result);
        }
      );
    });
  }
}
