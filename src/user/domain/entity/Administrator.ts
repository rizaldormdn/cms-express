import Author from "./Author";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import ResetPasswordToken from "../valueobject/ResetPasswordToken";

export default class Administrator extends User {
  constructor(
    email: Email,
    name: Name,
    password?: Password,
    resetPasswordToken?: ResetPasswordToken
  ) {
    super(email, name, true, password, resetPasswordToken);
  }

  public addAuthor(email: Email, name: Name): Author {
    return new Author(email, name, new Password(), new ResetPasswordToken());
  }
}