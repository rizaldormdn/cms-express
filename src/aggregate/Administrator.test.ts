import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import Administrator from "./Administrator";
import User from "./User";

describe("Administator", () => {
  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John Doe");
  let password: Password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
  let administator: Administrator = new Administrator(email, name, password);

  it("should create an author", () => {
    let authorEmail: Email = new Email("author@example.com");
    
    expect(administator.addAuthor(authorEmail, name)).toBeDefined()
  })
})