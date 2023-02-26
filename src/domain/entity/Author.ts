import Article from "../aggregate/Article";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import { Tags } from "../valueobject/Tag";
import Slug from "../valueobject/Slug";
import ResetPasswordToken from "../valueobject/ResetPasswordToken";

export default class Author extends User {
  constructor(
    email: Email,
    name: Name,
    password?: Password,
    resetPasswordToken?: ResetPasswordToken
  ) {
    super(email, name, password, resetPasswordToken);
  }

  public addArticle(
    content: Content,
    image: Image,
    tags: Tags,
  ): Article {
    let slug = new Slug(content.title)
    let article = new Article(slug, content, image, super.name.full(), super.email.string(), tags)

    return article
  }

  public updateArticle(
    article: Article,
    newContent: Content,
    newImage: Image,
    newTags: Tags,
  ): Article {
    if (this._email.string() !== article.authorEmail) {
      throw new Error('permission denied')
    }

    article.updateContent(newContent)
    article.updateImage(newImage)
    article.updateTags(newTags)

    return article
  }
}