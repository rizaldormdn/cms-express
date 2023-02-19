import { administrator, authorEmail, name } from "../../../test/data/Data"

describe("Administator", () => {
  it("should create an author", () => {
    expect(administrator.addAuthor(authorEmail, name)).toBeDefined()
  })
})