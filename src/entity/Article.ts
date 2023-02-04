import ArticleDate from "../valueobject/ArticleDate";
import Content from "../valueobject/Content";
import { Tags } from "../valueobject/Tag";
import Image from "./Image";

export default class Article {
  private _slug: string;
  private _content: Content;
  private _image: Image;
  private _author: string;
  private _tags: Tags;
  private _relatedArticles: Articles;
  private _isPublished: boolean;
  private _date: ArticleDate;

  constructor(
    content: Content,
    image: Image,
    author: string,
    tags: Tags,
    relatedArticles: Articles,
    date: ArticleDate
  ) {
    if (author === "") {
      throw new Error("author is required");
    }

    this._slug = this.generateSlug(content.title);
    this._content = content;
    this._image = image;
    this._author = author;
    this._tags = tags;
    this._relatedArticles = relatedArticles;
    this._isPublished = false;
    this._date = date
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

  public get image(): Image {
    return this._image;
  }

  public get author(): string {
    return this._author;
  }

  public get tags(): Tags {
    return this._tags;
  }

  public get relatedArticles(): Articles {
    return this._relatedArticles.slice(0, 4);
  }

  public get isPublished(): boolean {
    return this._isPublished;
  }

  public get date(): ArticleDate {
    return this._date;
  }

  public publish(): void {
    this._isPublished = true;
  }
}

export type Articles = Article[];
