import Content from "../valueobject/Content";
import Dimension from "../valueobject/Dimension";
import Image from "./Image";
import Article from "./Article";
import ArticleDate from "../valueobject/ArticleDate";
import ImageURL from "../valueobject/ImageURL";
import Slug from "../valueobject/Slug";
import { ArticleSnapshots } from "../valueobject/ArticleSnapshot";
import { Tags } from "../valueobject/Tag";

describe("Article", () => {
  let title = "This is title"
  let slug = new Slug(title)
  let content = new Content(title, "This is content", "This is excerpt");
  let dimension = new Dimension(1920, 1080);
  let imageURL = new ImageURL("http://example.com/original.jpg", "http://example.com/thumbnail.jpg")
  let image = new Image(imageURL, "A sample image", dimension);
  let authorName = "John Doe"
  let tags: Tags = []
  let relatedArticles: ArticleSnapshots = []
  let isPublished = true
  let date = new ArticleDate()
  let article = new Article(slug, content, image, authorName, tags, relatedArticles, isPublished, date);

  it("should have a slug based on the article title", () => {
    expect(article.slug.value).toMatch(/^this-is-title-[a-f0-9]+/);
  });

  it("should have content, image, author name, tags, related articles, is published, and date properties", () => {
    expect(article.content).toEqual(content);
    expect(article.image).toEqual(image);
    expect(article.authorName).toEqual(authorName);
    expect(article.tags).toEqual(tags);
    expect(article.relatedArticles).toEqual(relatedArticles)
    expect(article.isPublished).toEqual(isPublished);
    expect(article.date).toEqual(date)
  });

  it("should be initially unpublished", () => {
    let article = new Article(slug, content, image, authorName);

    expect(article.isPublished).toBe(false);
  });

  it("should be able to be publish and unpublish", () => {
    let article = new Article(slug, content, image, authorName);

    article.publish();

    expect(article.isPublished).toBe(true);

    article.unpublish();

    expect(article.isPublished).toBe(false);
  });

  it("should throw an error if author is missing", () => {
    expect(() => new Article(slug, content, image, "")).toThrow(
      "author name cannot be empty"
    );
  });
});
