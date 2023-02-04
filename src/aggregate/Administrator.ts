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

  public addAuthor(email: Email, name: Name): Author {
    return new Author(email, name, new Password(), []);
  }
}