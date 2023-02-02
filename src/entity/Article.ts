import Category from "./Category";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "./Image";

export default class Article {
  private _slug: string;
  private _content: Content;
  private _author: string;
  private _category: Category;
  private _image: Image;
  private _isPublished: boolean;
  private _date: ArticleDate;
  private _relatedArticles: Articles;

  constructor(
    content: Content,
    author: string,
    category: Category,
    image: Image,
    date: ArticleDate,
    relatedArticles: Articles
  ) {
    if (!content) {
      throw new Error("Content is required");
    }
    if (!author) {
      throw new Error("Author is required");
    }
    if (!date) {
      new ArticleDate();
    }
    this._slug = this.generateSlug(content.title);
    this._content = content;
    this._author = author;
    this._category = category;
    this._image = image;
    this._isPublished = false;
    this._date = new ArticleDate();
    if (!date) {
      this._date = date;
    }
    this._relatedArticles = relatedArticles;
  }

  private generateSlug(title: string): string {
    return (
      title.toLowerCase().replace(/\s+/g, "-") +
      Buffer.from(Date.now().toString(), "base64")
    );
  }

  public get slug(): string {
    return this._slug;
  }

  public get content(): Content {
    return this._content;
  }

  public get author(): string {
    return this._author;
  }

  public get category(): Category {
    return this._category;
  }

  public get image(): Image {
    return this._image;
  }

  public get isPublished(): boolean {
    return this._isPublished;
  }

  public get date(): ArticleDate {
    return this._date;
  }

  public relatedArticles(): Articles {
    return this._relatedArticles.slice(0, 4);
  }

  public publish(): void {
    this._isPublished = true;
  }
}

export type Articles = Article[];
