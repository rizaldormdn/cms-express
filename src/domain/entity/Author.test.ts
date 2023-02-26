import { author, article, slug, content, image, tags } from "../../testdata"
import Article from "../aggregate/Article";

describe("aggregate author", () => {
  it("should add an article", () => {
    try {
      author.addArticle(content, image, tags)
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("should update an article", () => {
    try {
      author.updateArticle(article, content, image, tags)
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("could not update other articles", () => {
    try {
      let article = new Article(slug, content, image, author.name.full(), "other@example.com", tags)

      author.updateArticle(article, content, image, tags)
    } catch(err) {
      expect(err).toBeInstanceOf(Error)
    }
  })
});
