import Author from "./Author";
import Article, { Articles } from "../entity/Article";
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
  let articles: Articles = [];
  let author: Author = new Author(email, name, password, articles);

  it("should have articles", () => {
    expect(author.articles).toBe(articles)
  })

  it("should add a password", () => {
    let newPassword: Password = new Password()
    
    author.addPassword(newPassword)

    expect(author.password).toEqual(newPassword)
  })

  it("should add an article", () => {
    let content = new Content("This is title", "This is content", "This is excerpt")
    let dimension = new Dimension(1200, 630)
    let image = new Image("http://example.com/image.jpg", "A sample image", dimension, [])
    let article: Article = author.addArticle(content, image, [])

    expect(article).toBeDefined()
    expect(author.articles).toContain(article)
  })
});
