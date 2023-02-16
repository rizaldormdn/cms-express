import ArticleDate from "../valueobject/ArticleDate";
import { ArticleSnapshots } from "../valueobject/ArticleSnapshot";
import Content from "../valueobject/Content";
import Slug from "../valueobject/Slug";
import { Tags } from "../valueobject/Tag";
import Image from "../entity/Image";

export default class Article {
  private _slug: Slug;
  private _content: Content;
  private _image: Image;
  private _authorName: string;
  private _authorEmail: string;
  private _tags: Tags = [];
  private _relatedArticles: ArticleSnapshots = [];
  private _isPublished: boolean = false;
  private _date: ArticleDate = new ArticleDate();
  updateTags: any;
  updateImage: any;
  updateContent: any;

  constructor(
    slug: Slug,
    content: Content,
    image: Image,
    authorName: string,
    authorEmail: string,
    tags?: Tags,
    relatedArticles?: ArticleSnapshots,
    isPublished?: boolean,
    date?: ArticleDate
  ) {
    if (authorName === "") {
      throw new Error("author name cannot be empty");
    }
    if (authorEmail === "") {
      throw new Error("author email cannot be empty");
    }
    if (tags !== undefined) {
      this._tags = tags;
    }
    if (relatedArticles !== undefined) {
      this._relatedArticles = relatedArticles;
    }
    if (isPublished !== undefined) {
      this._isPublished = isPublished;
    }
    if (date !== undefined) {
      this._date = date;
    }

    this._slug = slug;
    this._content = content;
    this._image = image;
    this._authorName = authorName;
    this._authorEmail = authorEmail;
  }

  public get slug(): Slug {
    return this._slug;
  }

  public get content(): Content {
    return this._content;
  }

  public get image(): Image {
    return this._image;
  }

  public get authorName(): string {
    return this._authorName;
  }

  public get authorEmail(): string {
    return this._authorEmail;
  }

  public get tags(): Tags {
    return this._tags;
  }

  public get relatedArticles(): ArticleSnapshots {
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

  public unpublish(): void {
    this._isPublished = false;
  }
}

export type Articles = Article[];
