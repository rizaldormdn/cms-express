import Password from "./Password";

describe("password value object", () => {
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
