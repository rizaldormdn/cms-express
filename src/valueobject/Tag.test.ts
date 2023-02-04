import Tag from "./Tag"

describe("Tag", () => {
  it("should accept only trimmed lowercase and uppercase letters and numbers", () => {
    let tag = new Tag("   SALT @#$%&!Academy   ")

    expect(tag.value).toBe("SALT Academy")
  })
})