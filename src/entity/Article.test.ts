import Article from "./Article";
import Author from "../aggregate/Author";
import Category from "./Category";
import Content from "../valueobject/Content";

describe("Article", () => {
  let content: Content;
  let author: Author;
  let category: Category;
  let article: Article;

  beforeEach(() => {
    content = new Content("This is Title", "This is the content");
    author = new Author("John Doe", "johndoe@email.com");
    category = new Category("Technology");
    article = new Article(content, author, category);
  });

  test("should have correct slug", () => {
    expect(article.slug).toMatch(/^this-is-title-\w{20}$/);
  });

  test("should have correct content", () => {
    expect(article.content).toBe(content);
  });

  test("should have correct author", () => {
    expect(article.author).toBe(author);
  });

  test("should have correct category", () => {
    expect(article.category).toBe(category);
  });

  test("should have correct isPublished value", () => {
    expect(article.isPublished).toBe(false);
  });

  test("should be able to change isPublished value to true", () => {
    article.publish();
    expect(article.isPublished).toBe(true);
  });

  test("should have a date", () => {
    expect(article.date).toBeInstanceOf(Date);
  });
});
