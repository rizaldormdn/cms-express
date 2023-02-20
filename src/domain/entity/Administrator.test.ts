import { administrator, authorEmail, name } from "../../testdata"

describe("Administator", () => {
  it("should create an author", () => {
    expect(administrator.addAuthor(authorEmail, name)).toBeDefined()
  })
})