import { author, article, otherArticle, slug, content, image, tags } from "../../../testdata"

describe("aggregate author", () => {
  it("should add an article", () => {
    try {
      author.addArticle(content, image, tags)
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  describe("update article", () => {
    it("should update an article", () => {
      try {
        author.updateArticle(slug, content, image, tags)
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  })
});
