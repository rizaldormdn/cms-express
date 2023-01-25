import { Connection, MysqlError } from "mysql";
import { CategoryRepository } from "../../repository/CategoryRepository";
import Category from "../../entity/Category";

export default class CategoryMySQL implements CategoryRepository {
	private _connection: Connection;

	constructor(connection: Connection) {
		this._connection = connection;
	}

	public async getCategory(uuid: string): Promise<Category> {
		return new Promise<Category>((resolve, reject) => {
			this._connection.query(
				`SELECT id, name FROM categories WHERE id = ? LIMIT 5`,
				[uuid],
				(err: MysqlError | null, result: any) => {
					if (err) reject(err.message);
					if (
						result !== undefined &&
						result !== null &&
						result !== result.length
					) {
						console.log(result);
						// let category: Category = new Category(result);
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
				(err: MysqlError | null, result: any) => {
					if (err) reject(err.message);
          resolve(result);
				}
			);
		});
	}
}
