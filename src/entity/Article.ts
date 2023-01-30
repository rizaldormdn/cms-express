import Category from "./Category";
import Author from "../aggregate/Author";
import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import Image from "./Image";

export type Articles = Article[];

export default class Article {
  public _slug: string;
  public _content: Content;
  public _author: Author;
  public _category: Category;
  public _image: Image;
  public _isPublished: boolean;
  public _date: ArticleDate;

  constructor(
    content: Content,
    author: Author,
    category: Category,
    image: Image
  ) {
    if (!content) {
      throw new Error("Content is required");
    }
    if (!author) {
      throw new Error("Author is required");
    }
    if (this._date === "") {
      new ArticleDate();
    }
    this._content = content;
    this._author = author;
    this._category = category;
    this._image = image;
    this._slug = this.generateSlug(content._title);
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

  get image(): Category {
    return this._image;
  }

  get isPublished(): boolean {
    return this._isPublished;
  }

  get date(): ArticleDate {
    return this._date;
  }

  public generateSlug(title: string): string {
    return (
      title.toLowerCase().replace(/\s+/g, "-") + btoa(Date.now().toString())
    );
  }

  public static allArticles: Articles = [];

  public relatedArticles(): Articles {
    return Article.allArticles
      .filter(
        (article) => article.category === this.category && article !== this
      )
      .slice(0, 4);
  }

  public publish(): void {
    this._isPublished = true;
  }
}
