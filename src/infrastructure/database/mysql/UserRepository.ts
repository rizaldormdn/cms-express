import { request } from "express";
import { Connection } from "mysql2";
import Administrator from "../../../domain/aggregate/Administrator";
import Author from "../../../domain/aggregate/Author";
import * as UserRepositoryDomain from "../../../domain/repository/UserRepository";
import Email from "../../../domain/valueobject/Email";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";

export default class UserRepository implements UserRepositoryDomain.default {
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
					if (err) reject(err);
					if (result.length > 0) {
						resolve(new Administrator(
							email,
							new Name(result[0].first_name),
							new Password(result[0].salt, result[0].hashed_password)
						))
					}
				}
			);
		});
	}

	public getAuthor(email: Email): Promise<Author> {
		return new Promise<Author>(() => { });
	}

	public saveAuthor(author: Author): Promise<void> {
		return new Promise<void>(() => { });
	}

	public updateAdministrator(administrator: Administrator): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			
			this._connection.query(
				"UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE email = ? AND is_administrator IS TRUE LIMIT 1",
				[
					administrator.email,					
					administrator.name.first,
					administrator.name.last,					
					administrator.email,
				],
				(err: any | null, result: any) => {
					if (err) reject(err)
					if (result.affectedRows > 0) {
						resolve(result)
					}
				}
			)
		});
	}

	public updateAuthor(author: Author): Promise<void> {
		return new Promise<void>(() => { });
	}

	public deleteAuthor(email: Email): Promise<void> {
		return new Promise<void>(() => { });
	}
}
