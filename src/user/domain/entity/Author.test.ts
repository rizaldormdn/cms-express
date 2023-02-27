import { author, article, otherArticle, content, image, tags } from "../../../testdata"

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
        author.updateArticle(article, content, image, tags)
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("could not update other articles", () => {
      try {
        author.updateArticle(otherArticle, content, image, tags)
      } catch(err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  describe("publish article", () => {
    it("should publish an article", () => {
      try {
        author.publishArticle(article)

        expect(article.isPublished).toBeTruthy()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("could not publish other articles", () => {
      try {
        author.publishArticle(otherArticle)
      } catch(err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  describe("unpublish article", () => {
    it("should unpublish an article", () => {
      try {
        author.unpublishArticle(article)

        expect(article.isPublished).toBeFalsy()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("could not unpublish other articles", () => {
      try {
        author.unpublishArticle(otherArticle)
      } catch(err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })
});
