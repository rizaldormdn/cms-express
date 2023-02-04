import Article, { Articles } from "../entity/Article";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";
import { Tags } from "../valueobject/Tag";

export default class Author extends User {
  private _articles: Articles;

  constructor(
    email: Email,
    name: Name,
    password: Password,
    articles: Articles,
  ) {
    super(email, name, password);
    
    this._articles = articles;
  }

  public get articles(): Articles {
    return this._articles;
  }

  public createArticle(
    content: Content,
    image: Image,
    tags: Tags,
  ): Article {
    let article = new Article(content, image, super.name.full(), tags, [], new ArticleDate())

    this._articles.push(article)

    return article
  }
}