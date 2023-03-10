import Article from "../../../article/domain/aggregate/Article";
import Content from "../../../article/domain/valueobject/Content";
import Image from "../../../image/domain/entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import { Tags } from "../../../article/domain/valueobject/Tag";
import Slug from "../../../article/domain/valueobject/Slug";
import ResetPasswordToken from "../valueobject/ResetPasswordToken";
import Program from "../../../program/domain/aggregate/Program";

export default class Author extends User {
  constructor(
    email: Email,
    name: Name,
    password?: Password,
    resetPasswordToken?: ResetPasswordToken
  ) {
    super(email, name, false, password, resetPasswordToken);
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
    slug: Slug,
    newContent: Content,
    newImage: Image,
    newTags: Tags
  ): Article {
    return new Article(
      slug,
      newContent,
      newImage,
      this._name.full(),
      this._email.string(),
      newTags
    )
  }
  public addProgram(
    content: Content,
    image: Image,
  ): Program {
    let slug = new Slug(content.title)
    let program = new Program(slug, content, image, super.name.full(), super.email.string())

    return program
  }
}