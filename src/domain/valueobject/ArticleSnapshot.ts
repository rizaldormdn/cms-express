import ArticleDate from "./ArticleDate";
import Content from "./Content";
import Slug from "./Slug";
import { Tags } from "./Tag";

export default class ArticleSnapshot {
  private _slug: Slug
  private _content: Content
  private _imageThumbnailURL: string
  private _authorName: string
  private _tags: Tags
  private _date: ArticleDate

  constructor(slug: Slug, content: Content, imageThumbnailURL: string, authorName: string, tags: Tags, date: ArticleDate) {
    if (imageThumbnailURL === "") {
      throw new Error("image thumbnail URL cannot be empty")
    }
    if (authorName === "") {
      throw new Error("author name cannot be empty")
    }
  
    this._slug = slug
    this._content = content
    this._imageThumbnailURL = imageThumbnailURL
    this._authorName = authorName
    this._tags = tags
    this._date = date
  }

  public get slug(): Slug {
    return this._slug
  }

  public get content(): Content {
    return this._content
  }

  public get imageThumbnailURL(): string {
    return this._imageThumbnailURL
  }

  public get authorName(): string {
    return this._authorName
  }

  public get tags(): Tags {
    return this._tags
  }

  public get date(): ArticleDate {
    return this._date
  }
}

export type ArticleSnapshots = ArticleSnapshot[]