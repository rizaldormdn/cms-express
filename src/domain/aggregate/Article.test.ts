import Article from "./Article";
import { article, content, image, authorName, authorEmail, tags, slug } from "../../testdata"

describe("Article", () => {
  it("should have a slug based on the article title", () => {
    expect(article.slug.value).toMatch(/^this-is-title-[a-f0-9]+/);
  });

  it("should have content, image, author name, author email, tags, related articles, is published, and date properties", () => {
    expect(article.content).toEqual(content);
    expect(article.image).toEqual(image);
    expect(article.authorName).toEqual(authorName);
    expect(article.authorEmail).toBeDefined();
    expect(article.tags).toEqual(tags);
    expect(article.relatedArticles).toBeDefined();
    expect(article.isPublished).toEqual(false);
    expect(article.date).toBeDefined();
  });

  it("should have predefined content, image, author name, author email, tags, related articles, is published, and date properties", () => {
    let rebuildedArticle = new Article(article.slug, article.content, article.image, article.authorName, article.authorEmail, article.tags, article.relatedArticles, article.isPublished, article.date)
    
    expect(rebuildedArticle.content).toEqual(content);
    expect(rebuildedArticle.image).toEqual(image);
    expect(rebuildedArticle.authorName).toEqual(authorName);
    expect(rebuildedArticle.authorEmail).toBeDefined();
    expect(rebuildedArticle.tags).toEqual(tags);
    expect(rebuildedArticle.relatedArticles).toBeDefined();
    expect(rebuildedArticle.isPublished).toEqual(false);
    expect(rebuildedArticle.date).toBeDefined();
  });

  it("should be initially unpublished", () => {
    let article = new Article(slug, content, image, authorName, authorEmail.string());

    expect(article.isPublished).toBe(false);
  });

  it("should be able to be publish and unpublish", () => {
    let article = new Article(slug, content, image, authorName, authorEmail.string());

    article.publish();

    expect(article.isPublished).toBe(true);

    article.unpublish();

    expect(article.isPublished).toBe(false);
  });

  it("should throw an error if author name is missing", () => {
    expect(() => new Article(slug, content, image, "", authorEmail.string())).toThrow(
      "author name cannot be empty"
    );
  });

  it("should throw an error if author email is missing", () => {
    expect(() => new Article(slug, content, image, authorName, "")).toThrow(
      "author email cannot be empty"
    );
  });

  it("should update content", () => {
    article.updateContent(content)

    expect(article.content).toBe(content);
  })

  it("should update image", () => {
    article.updateImage(image)

    expect(article.image).toBe(image);
  })

  it("should update tags", () => {
    article.updateTags(tags)

    expect(article.tags).toBe(tags);
  })
});
