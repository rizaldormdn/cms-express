import Category from "./Category";

describe("Category", () => {
  it("should set the name when constructed", () => {
    const category = new Category("Test Category");
    expect(category.name).toBe("Test Category");
  });

  it("should generate a unique id when constructed", () => {
    const category1 = new Category("Test Category 1");
    const category2 = new Category("Test Category 2");
    expect(category1.id).not.toBe(category2.id);
  });

  it("should throw an error when constructed with an empty name", () => {
    expect(() => new Category("")).toThrowError("name cannot be empty");
  });

  it("should be able to add articles", () => {
    const category = new Category("Test Category");
    const article = {
      slug: "test-article",
      content: {
        title: "Test Article",
        excerpt: "Test excerpt",
        content: "Test content",
      },
      author: "John Doe",
      category: category,
      image: "test-image.jpg",
      isPublished: true,
      date: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    category.addArticle(article);
    expect(category.articles).toContain(article);
  });
});
