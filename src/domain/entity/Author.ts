import Article from "../aggregate/Article";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import { Tags } from "../valueobject/Tag";
import Slug from "../valueobject/Slug";

export default class Author extends User {
  constructor(
    email: Email,
    name: Name,
    password: Password,
  ) {
    super(email, name, password);
  }

  public addPassword(password: Password) {
    super._password = password;
  }

  public addArticle(
    content: Content,
    image: Image,
    tags: Tags,
  ): Article {
    let slug = new Slug(content.title)
    let article = new Article(slug, content, image, super.name.full(), tags)

    return article
  }
}