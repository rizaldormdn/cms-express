import Password from "./Password";

describe("password value object", () => {
  it("should have salt and hashed password", () => {
    let password: Password = new Password();

    expect(password.salt).not.toBe("")
    expect(password.hashedPassword).toBe("")
  })

  it("can verify the right password", () => {
    let password: Password = new Password();

    password.hash("password");

    expect(password.verify("password")).toBeTruthy();
  })

  it("can verify the right password with defined salt", () => {
    let salt = "$2b$10$WCZ6j4PLICecyCYvBvL7We";
    let password: Password = new Password(salt);

    password.hash("password");

    expect(password.verify("password")).toBeTruthy();
  })

  it("can verify the wrong password", () => {
    let password: Password = new Password();

    password.hash("password");

    expect(password.verify("wrongpassword")).toBeFalsy();
  })
});
