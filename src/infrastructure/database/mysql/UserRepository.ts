import { Connection } from "mysql2";
import Administrator from "../../../domain/entity/Administrator";
import Author from "../../../domain/entity/Author";
import * as UserRepositoryInterface from "../../../domain/repository/UserRepository";
import Email from "../../../domain/valueobject/Email";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";

export default class UserRepository implements UserRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public getAdministrator(email: Email): Promise<Administrator> {
    return new Promise<Administrator>((resolve, reject) => {
      this._connection.query(
        "SELECT first_name, last_name, salt, hashed_password FROM users WHERE email = ? AND is_administrator IS TRUE LIMIT 1",
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
                new Password(result[0].salt, result[0].hashed_password)
              )
            );
          }
        }
      );
    });
  }

  public getAuthor(email: Email): Promise<Author> {
    return new Promise<Author>((resolve, reject) => {
      this._connection.query(
        "SELECT first_name, last_name, salt, hashed_password FROM users WHERE email = ? AND is_administrator IS FALSE LIMIT 1",
        [email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(err);
          }
          if (result.length > 0) {
            resolve(
              new Author(
                email,
                new Name(result[0].first_name, result[0].last_name),
                new Password(result[0].salt, result[0].hashed_password)
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
        "INSERT INTO users (email, first_name, last_name, salt, hashed_password) VALUES (?, ?, ?, ?, ?)",
        [
          author.email.string(),
          author.name.first,
          author.name.last,
          author.password.salt,
          author.password.hashedPassword,
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

  public updateAdministrator(administrator: Administrator): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ? WHERE email = ? AND is_administrator IS TRUE",
        [
          administrator.name.first,
          administrator.name.last,
          administrator.password.salt,
          administrator.password.hashedPassword,
          administrator.email.string(),
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

  public updateAuthor(author: Author): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ? WHERE email = ? AND is_administrator IS FALSE",
        [
          author.name.first,
          author.name.last,
          author.password.salt,
          author.password.hashedPassword,
          author.email.string(),
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
