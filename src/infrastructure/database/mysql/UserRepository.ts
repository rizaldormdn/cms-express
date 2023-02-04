import { Connection } from "mysql2";
import Administrator from "../../../aggregate/Administrator";
import Author from "../../../aggregate/Author";
import * as UserRepositoryDomain from "../../../repository/UserRepository";
import Email from "../../../valueobject/Email";
import Name from "../../../valueobject/Name";
import Password from "../../../valueobject/Password";

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
		return new Promise<Author>(() => {});
	}

	public saveAuthor(author: Author): Promise<void> {
		return new Promise<void>(() => {});
	}

	public updateAuthor(author: Author): Promise<void> {
		return new Promise<void>(() => {});
	}

	public deleteAuthor(email: Email): Promise<void> {
		return new Promise<void>(() => {});
	}
}
