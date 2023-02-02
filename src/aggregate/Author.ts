import Category from "../entity/Category";
import Article, { Articles } from "../entity/Article";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import User from "./User";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";

class Author extends User {
  private _articles: Articles;
  constructor(
    articles: Articles,
    email: Email,
    name: Name,
    password: Password
  ) {
    super(email, name, password);
    this._articles = articles;
  }

  public createArticle(
    content: Content,
    author: string,
    image: Image,
    category: Category,
    date: ArticleDate,
    relatedArticles: Articles
  ): Article {
    let article = new Article(
      content,
      author,
      category,
      image,
      date,
      relatedArticles
    );
    return article;
  }

  public createCategory(name: string): Category {
    let category: Category = new Category(name);
    return category;
  }
}

export default Author;
