import Content from "../valueobject/Content";
import Dimension from "../valueobject/Dimension";
import Image from "./Image";
import Article, { Articles } from "./Article";
import ArticleDate from "../valueobject/ArticleDate";

describe("Article", () => {
  let content = new Content("This is title", "This is content", "This is excerpt");
  let dimension = new Dimension(1200, 630);
  let image = new Image("http://example.com/image.jpg", "A sample image", dimension, []);
  let author = "John Doe"
  let relatedArticles: Articles = []
  let date = new ArticleDate()
  let article = new Article(content, image, author, [], relatedArticles, date);

  it("should have a slug based on the article title", () => {
    expect(article.slug).toMatch(/^this-is-title-[a-zA-Z0-9]+/);
  });

  it("should have content, image, author, tags, related articles, and date properties", () => {
    expect(article.content).toEqual(content);
    expect(article.image).toEqual(image);
    expect(article.author).toEqual(author);
    expect(article.tags).toEqual([]);
    expect(article.relatedArticles).toEqual(relatedArticles)
    expect(article.date).toEqual(date)
  });

  it("should be initially unpublished", () => {
    expect(article.isPublished).toBe(false);
  });

  it("should be able to be published", () => {
    article.publish();

    expect(article.isPublished).toBe(true);
  });

  it("should throw an error if author is missing", () => {
    expect(() => new Article(content, image, "", [], [], new ArticleDate())).toThrow(
      "author is required"
    );
  });
});
