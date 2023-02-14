import ArticleDate from "./ArticleDate";
import Content from "./Content";
import Slug from "./Slug";
import { Tags } from "./Tag";

export default class ArticleSnapshot {
  private _slug: Slug
  private _title: string
  private _excerpt: string
  private _imageThumbnailURL: string
  private _authorName: string
  private _tags: Tags
  private _date: ArticleDate

  constructor(slug: Slug, title: string, excerpt: string, imageThumbnailURL: string, authorName: string, tags: Tags, date: ArticleDate) {
    if (title === "") {
      throw new Error("title cannot be empty")
    }
    if (excerpt === "") {
      throw new Error("excerpt cannot be empty")
    }
    if (imageThumbnailURL === "") {
      throw new Error("image thumbnail URL cannot be empty")
    }
    if (authorName === "") {
      throw new Error("author name cannot be empty")
    }
  
    this._slug = slug
    this._title = title
    this._excerpt = excerpt
    this._imageThumbnailURL = imageThumbnailURL
    this._authorName = authorName
    this._tags = tags
    this._date = date
  }

  public get slug(): Slug {
    return this._slug
  }

  public get title(): string {
    return this._title
  }

  public get excerpt(): string {
    return this._excerpt
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