import { slug, title, excerpt, imageThumbnailURL, authorName, tags, articleDate, articleSnapshot } from "../../../test/data/Data"
import ArticleDate from "./ArticleDate"
import ArticleSnapshot from "./ArticleSnapshot"

type articleSnapshotParam = {
  title: string
  excerpt: string
  imageThumbnailURL: string
  authorName: string
}
type articleSnapshotParams = articleSnapshotParam[]

describe("ArticleSnapshot", () => {
  it("should have slug, title, excerpt, image thumbnail URL, author name, tags, and date", () => {
    expect(articleSnapshot.slug).toBe(slug)
    expect(articleSnapshot.title).toBe(title)
    expect(articleSnapshot.excerpt).toBe(excerpt)
    expect(articleSnapshot.imageThumbnailURL).toBe(imageThumbnailURL)
    expect(articleSnapshot.authorName).toBe(authorName)
    expect(articleSnapshot.tags).toBe(tags)
    expect(articleSnapshot.date).toBe(articleDate)
  })

  test("title, excerpt, image thumbnail URL, and author name cannot be empty", () => {
    let params: articleSnapshotParams = [
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

    for (let param of params) {
      expect(() => new ArticleSnapshot(
        slug,
        param.title,
        param.excerpt,
        param.imageThumbnailURL,
        param.authorName,
        tags,
        new ArticleDate()
      )).toThrowError()
    }
  })
})