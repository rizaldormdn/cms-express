import Category from "./Category";

type Content = {
  title: string;
  content: string;
  excerpt: string;
  image: string;
};

type Author = {
  name: string;
};

type ArticleDate = {
  createdAt: Date;
  updatedAt: Date;
};

export default class Article {
  public _slug: string;
  public _content: Content;
  public _author: Author;
  public _category: Category;
  public _isPublished: boolean;
  public _date: ArticleDate;

  constructor(
    slug: string,
    content: Content,
    author: Author,
    category: Category,
    date: ArticleDate
  ) {
    this._slug = slug;
    this._content = content;
    this._author = author;
    this._category = category;
    this._date = date;
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
    let slug = title.replace(/\s+/g, "-");
    slug = slug.toLowerCase();
    slug = slug.replace(/[^a-z0-9-]/g, "");
    this._slug = slug;
    return this._slug;
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
