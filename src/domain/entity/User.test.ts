import User from "./User";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import ResetPasswordToken from "../valueobject/ResetPasswordToken";
import { user, password, email, name } from "../../testdata"

describe("User", () => {
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

    expect(user.password!.verify("password123")).toBeTruthy()
  })

  it("could have a reset password token", () => {
    let resetPasswordToken = new ResetPasswordToken()
    let user: User = new User(email, name, password, resetPasswordToken);

    expect(user.resetPasswordToken).toBeDefined();
  })

  it("could add a reset password token", () => {
    user.addResetPasswordToken(new ResetPasswordToken())

    expect(user.resetPasswordToken).toBeDefined();
  })

  it("should have is administrator flag", () => {
    expect(user.isAdministrator).toBeFalsy();
  })
});
