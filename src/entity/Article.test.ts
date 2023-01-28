import Article from "./Article";
import Category from "./Category";

describe("Article", () => {
  let article: Article;
  let category = new Category("test-category");
  let content = {
    title: "Test Title",
    content: "Test Content",
    excerpt: "Test Excerpt",
    image: "test-image.jpg",
  };
  let author = { name: "Test Author" };
  let date = { createdAt: new Date(), updatedAt: new Date() };

  beforeEach(() => {
    article = new Article("test-slug", content, author, category, date);
  });

  test("generateSlug()", () => {
    let title = "Test Title";
    let expectedSlug = "test-title";
    expect(article.generateSlug(title)).toBe(expectedSlug);
    expect(article.slug).toBe(expectedSlug);
  });

  test("relatedArticles()", () => {
    // Code Later
  });

  test("publish()", () => {
    expect(article.isPublished).toBe(false);
    article.publish();
    expect(article.isPublished).toBe(true);
  });

  test("getter", () => {
    expect(article.slug).toBe("test-slug");
    expect(article.content).toBe(content);
    expect(article.author).toBe(author);
    expect(article.category).toBe(category);
    expect(article.date).toBe(date);
  });
});
