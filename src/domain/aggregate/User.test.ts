import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";

describe("aggregate user", () => {
  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John", "Doe");
  let password: Password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
  let user: User = new User(email, name, password);

  test('email local of "test" should be "test"', () => {
    expect(user.email.local).toBe("test");
  });

  test('email domain of "example.com" should be "example.com"', () => {
    expect(user.email.domain).toBe("example.com");
  });

  test('email of "test@example.com" should be "test@example.com"', () => {
    expect(user.email.string()).toBe("test@example.com");
  });

  test('first name of "John" should be "John"', () => {
    expect(user.name.first).toBe("John");
  });

  test('last name of "Doe" should be "Doe"', () => {
    expect(user.name.last).toBe("Doe");
  });

  test('full name of "John Doe" should be "John Doe"', () => {
    expect(user.name.full()).toBe("John Doe");
  });

  it("should change name", () => {
    let newName: Name = new Name("John", "Cena")

    user.changeName(newName);

    expect(user.name.full()).toBe("John Cena")
  })

  it("should have password", () => {
    expect(user.password).toBe(password);
  })

  it("should change password", () => {
    let newPassword: Password = new Password()

    newPassword.hash("password123")
    user.updatePassword(newPassword)

    expect(user.password.verify("password123")).toBeTruthy()
  })
});
