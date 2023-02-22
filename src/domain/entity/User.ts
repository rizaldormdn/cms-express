import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import ResetPasswordToken from "../valueobject/ResetPasswordToken";

export default class User {
  protected _email: Email;
  protected _name: Name;
  protected _password: Password;
  protected _resetPasswordToken?: ResetPasswordToken;

  constructor(email: Email, name: Name, password: Password, resetPasswordToken?: ResetPasswordToken) {
    this._email = email;
    this._name = name;
    this._password = password;

    if (resetPasswordToken !== undefined) {
      this._resetPasswordToken = resetPasswordToken;
    }
  }

  public get email(): Email {
    return this._email;
  }

  public get name(): Name {
    return this._name;
  }

  public changeName(name: Name) {
    this._name = name;
  }

  public get password(): Password {
    return this._password;
  }

  public updatePassword(password: Password) {
    this._password = password;
  }

  public get resetPasswordToken(): ResetPasswordToken | undefined {
    return this._resetPasswordToken;
  }

  public addResetPasswordToken(resetPasswordToken: ResetPasswordToken) {
    this._resetPasswordToken = resetPasswordToken;
  }
}
