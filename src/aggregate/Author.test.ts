import Author from "./Author";
import Article from "../entity/Article";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import Dimension from "../valueobject/Dimension";

describe("aggregate author", () => {
  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John Doe");
  let password: Password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
  let author: Author = new Author(email, name, password, []);

  it("should have articles", () => {
    expect(author.articles).toBe([])
  })

  it("should create an article", () => {
    let content = new Content("This is title", "This is content", "This is excerpt")
    let dimension = new Dimension(1200, 630)
    let image = new Image("http://example.com/image.jpg", "A sample image", dimension, [])
    let article: Article = author.createArticle(content, image, [])

    expect(article).toBeDefined()
    expect(author.articles).toContain(article)
  })
});
