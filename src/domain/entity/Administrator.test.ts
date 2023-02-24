import { administrator, authorEmail, name } from "../../testdata"

describe("Administator", () => {
  it("should create an author", () => {
    try {
      administrator.addAuthor(authorEmail, name)
    } catch (err) {
      expect(err).toBeUndefined()
    }
  })
})