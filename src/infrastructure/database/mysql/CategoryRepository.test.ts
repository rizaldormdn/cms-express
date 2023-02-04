import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import { CategoryRepository } from "../../repository/CategoryRepository";
import CategoryMySQL from "./CategoryMySQL";
import Category from "../../entity/Category";

describe("User MySQL Repository", () => {
	let connection: Connection = mysql.createConnection({ host: "localhost" });
	let mock: SinonMock = sinon.mock(connection);
	let repository: CategoryRepository = new CategoryMySQL(connection);
	let uuid: string = "fd5317df-a548-47cb-a1ba-61321a385273";
	let name: string = "Article";

	it("should return saved category", async () => {
		mock
			.expects("query")
			.withArgs("SELECT id, name FROM categories WHERE name = ? LIMIT 1")
			.callsArgWith(
				2,
				null,
				[{ id: "fd5317df-a548-47cb-a1ba-61321a385273", name: "Article" }],
				["id", "name"]
			);

		let category: Category = await repository.getCategory(uuid);

		expect(category.id).toBe(uuid);
		expect(category.name).toBe(name);
	});

	it("should return an error when got failed to get a category", async () => {
		mock.expects("query").once().callsArgWith(2, new Error(), null, null);

		try {
			await repository.getCategory(uuid);
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});

	it("should create a category", () => {
		mock
			.expects("query")
			.withArgs(
				"INSERT INTO categories (id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())"
			);

		repository.saveCategory(new Category(name));
	});

	it("should return an error when got failed to create a category", async () => {
		mock.expects("query").once().callsArgWith(2, new Error(), null, null);

		try {
			await repository.saveCategory(new Category(name));
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});
});
