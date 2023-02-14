import ArticleSnapshot from "./ArticleSnapshot";
import Slug from "./Slug";
import Tag, { Tags } from "./Tag";
import ArticleDate from "./ArticleDate";

type articleSnapshot = {
  title: string
  excerpt: string
  imageThumbnailURL: string
  authorName: string
}
type articleSnapshots = articleSnapshot[]

describe("ArticleSnapshot", () => {
  let slug = new Slug("this-is-title-abc123")
  let title = "This is title"
  let excerpt = "This is excerpt"
  let imageThumbnailURL = "http://example.com/thumbnail.jpg"
  let authorName = "John Doe"
  let tags: Tags = [new Tag("Tag 1"), new Tag("Tag 2"), new Tag("Tag 3")]
  let date = new ArticleDate()

  it("should have slug, title, excerpt, image thumbnail URL, author name, tags, and date", () => {
    let articleSnapshot = new ArticleSnapshot(slug, title, excerpt, imageThumbnailURL, authorName, tags, date)

    expect(articleSnapshot.slug).toBe(slug)
    expect(articleSnapshot.title).toBe(title)
    expect(articleSnapshot.excerpt).toBe(excerpt)
    expect(articleSnapshot.imageThumbnailURL).toBe(imageThumbnailURL)
    expect(articleSnapshot.authorName).toBe(authorName)
    expect(articleSnapshot.tags).toBe(tags)
    expect(articleSnapshot.date).toBe(date)
  })

  test("title, excerpt, image thumbnail URL, and author name cannot be empty", () => {
    let entries: articleSnapshots = [
      {
        title: "",
        excerpt: excerpt,
        imageThumbnailURL: imageThumbnailURL,
        authorName: authorName
      },
      {
        title: title,
        excerpt: "",
        imageThumbnailURL: imageThumbnailURL,
        authorName: authorName
      },
      {
        title: title,
        excerpt: excerpt,
        imageThumbnailURL: "",
        authorName: authorName
      },
      {
        title: title,
        excerpt: excerpt,
        imageThumbnailURL: imageThumbnailURL,
        authorName: ""
      }
    ]

    for (let entry of entries) {
      expect(() => new ArticleSnapshot(
        slug,
        entry.title,
        entry.excerpt,
        entry.imageThumbnailURL,
        entry.authorName,
        tags,
        date
      )).toThrowError()
    }
  })
})