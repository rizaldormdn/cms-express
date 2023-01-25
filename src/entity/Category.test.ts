import Category from "./Category";

describe("Category entity", () => {
	let category: Category = new Category("Article");
	test('Category name of "Article" should be "Article"', () => {
		expect(category.name).toBe("Article");
	});
	test("Category id should be return random string value", () => {
		expect(category.id).not.toBeNull();
	});
});
