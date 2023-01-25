import { Connection } from "mysql2";
import { CategoryRepository } from "../../repository/CategoryRepository";
import Category from "../../entity/Category";

export default class CategoryMySQL implements CategoryRepository {
	private _connection: Connection;

	constructor(connection: Connection) {
		this._connection = connection;
	}

	public async getCategory(name: string): Promise<Category> {
		return new Promise<Category>((resolve, reject) => {
			this._connection.query(
				`SELECT id, name, created_at, updated_at FROM categories WHERE name = ? LIMIT 1`,
				[name],
				(err: any | null, result: any) => {
					if (err) reject(err.message);
					if (result !== undefined && result !== null && result !== "") {
						resolve(result[0]);
					}
				}
			);
		});
	}

	public async saveCategory(category: Category): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this._connection.query(
				"INSERT INTO categories (id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
				[category.id, category.name],
				(err: any | null, result: any) => {
					if (err) reject(err.message);
					resolve(result);
				}
			);
		});
	}
}
