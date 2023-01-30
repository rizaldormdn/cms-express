import Category from "./Category";
import Author from "../aggregate/Author";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "./Image";
import Article from "./Article";

describe("Article", () => {
  let content: Content;
  let author: Author;
  let category: Category;
  let image: Image;
  let article: Article;

  beforeEach(() => {
    content = new Content({ title: "Test Title", body: "Test Body" });
    author = new Author({ name: "Test Author" });
    category = new Category("Test Category");
    image = new Image({ url: "http://testimage.com/test.jpg" });
    article = new Article(content, author, category, image);
  });

  test("Should generate a slug based on the article title", () => {
    expect(article.slug).toMatch(/^test-title-[a-zA-Z0-9]+/);
  });

  test("Should have content, author, category and image properties", () => {
    expect(article.content).toEqual(content);
    expect(article.author).toEqual(author);
    expect(article.category).toEqual(category);
    expect(article.image).toEqual(image);
  });

  test("Should be initially un-published", () => {
    expect(article.isPublished).toBe(false);
  });

  test("Should be able to be published", () => {
    article.publish();
    expect(article.isPublished).toBe(true);
  });

  test("Should throw an error if content is missing", () => {
    expect(() => new Article(undefined, author, category, image)).toThrow(
      "Content is required"
    );
  });

  test("Should throw an error if author is missing", () => {
    expect(() => new Article(content, undefined, category, image)).toThrow(
      "Author is required"
    );
  });

  test("Should generate a new ArticleDate if none is provided", () => {
    expect(() => new Article(content, author, category, image)).not.toThrow();
  });

  test("Should return related articles for the same category", () => {
    const article2 = new Article(
      new Content({ title: "Test Title 2", body: "Test Body 2" }),
      author,
      category,
      image
    );
    const article3 = new Article(
      new Content({ title: "Test Title 3", body: "Test Body 3" }),
      author,
      new Category("Different Category"),
      image
    );
    expect(article.relatedArticles()).toEqual([article2]);
  });
});
