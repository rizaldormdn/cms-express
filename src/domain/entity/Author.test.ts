import Password from "../valueobject/Password";
import { author, content, image, tags } from "../../testdata"

describe("aggregate author", () => {
  it("should add a password", () => {
    let newPassword: Password = new Password()
    
    author.addPassword(newPassword)

    expect(author.password).toEqual(newPassword)
  })

  it("should add an article", () => {
    try {
      author.addArticle(content, image, tags)
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })
});
