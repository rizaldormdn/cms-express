import Category from "../entity/Category";
import Article, { Articles } from "../entity/Article";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";

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
    category: Category,
  ): Article {
    let article = new Article(content, image, super.name.full(), category, [], new ArticleDate())

    this._articles.push(article)

    return article
  }

  public createCategory(name: string): Category {
    return new Category(name, []);
  }
}