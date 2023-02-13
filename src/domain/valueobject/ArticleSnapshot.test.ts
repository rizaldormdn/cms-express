import ArticleSnapshot from "./ArticleSnapshot";
import Slug from "./Slug";
import Content from "./Content";
import Tag, { Tags } from "./Tag";
import ArticleDate from "./ArticleDate";

describe("ArticleSnapshot", () => {
  let slug = new Slug("this-is-title-abc123")
  let content = new Content("This is title", "This is content", "This is excerpt")
  let imageThumbnailURL = "http://example.com/thumbnail.jpg"
  let authorName = "John Doe"
  let tags: Tags = [new Tag("Tag 1"), new Tag("Tag 2"), new Tag("Tag 3")]
  let date = new ArticleDate()

  it("should have slug, content, image thumbnail URL, author name, tags, and date", () => {
    let articleSnapshot = new ArticleSnapshot(slug, content, imageThumbnailURL, authorName, tags, date)

    expect(articleSnapshot.slug).toBe(slug)
    expect(articleSnapshot.content).toBe(content)
    expect(articleSnapshot.imageThumbnailURL).toBe(imageThumbnailURL)
    expect(articleSnapshot.authorName).toBe(authorName)
    expect(articleSnapshot.tags).toBe(tags)
    expect(articleSnapshot.date).toBe(date)
  })

  test("image thumbnail URL cannot be empty", () => {
    expect(() => new ArticleSnapshot(slug, content, "", authorName, tags, date)).toThrowError()
  })

  test("author name cannot be empty", () => {
    expect(() => new ArticleSnapshot(slug, content, imageThumbnailURL, "", tags, date)).toThrowError()
  })
})