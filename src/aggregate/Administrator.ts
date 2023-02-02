import Author from "./Author";
import User from "./User";
import { Articles } from "../entity/Article";

class Administator {
  private _authors: Authors;

  constructor(authors: Authors) {
    this._authors = authors;
  }

  public registerAuthor(article: Articles, user: User): Author {
    let author = new Author(article, user.email, user.name, user.password);
    return author;
  }
}

export default Administator;

export type Authors = Authors[];
