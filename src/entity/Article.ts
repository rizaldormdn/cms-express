import Category from "./Category";
import Author from "../aggregate/Author";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";

export default class Article {
  public _slug: string;
  public _content: Content;
  public _author: Author;
  public _category: Category;
  public _isPublished: boolean;
  public _date: ArticleDate;

  constructor(content: Content, author: Author, category: Category) {
    this._content = content;
    this._author = author;
    this._category = category;
    this._slug = this.generateSlug(content._title);
    this._date = new Date();
    this._isPublished = false;
  }

  get slug(): string {
    return this._slug;
  }

  get content(): Content {
    return this._content;
  }

  get author(): Author {
    return this._author;
  }

  get category(): Category {
    return this._category;
  }

  get isPublished(): boolean {
    return this._isPublished;
  }

  get date(): ArticleDate {
    return this._date;
  }

  public generateSlug(title: string): string {
    let timestamp = new Date().getTime().toString();
    let randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    let slug =
      title.replace(/\s+/g, "-") + "-" + timestamp + "-" + randomString;
    slug = slug.toLowerCase();
    slug = slug.replace(/[^a-z0-9-]/g, "");
    return slug;
  }

  /* 
  public relatedArticles(): void {
    Code Later
  }
  */

  public publish(): void {
    this._isPublished = true;
  }
}
