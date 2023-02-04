import Author from "./Author";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";

export default class Administrator extends User {
  constructor(
    email: Email,
    name: Name,
    password: Password
  ) {
    super(email, name, password);
  }

  public createAuthor(user: User): Author {
    return new Author(user.email, user.name, user.password, []);
  }
}