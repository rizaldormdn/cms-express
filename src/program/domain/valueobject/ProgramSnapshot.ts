import ArticleDate from "../../../article/domain/valueobject/ArticleDate"
import Slug from "../../../article/domain/valueobject/Slug"
import { Tags } from "../../../article/domain/valueobject/Tag"

export default class ProgramSnapshot {
     private _slug: Slug
     private _title: string
     private _excerpt: string
     private _imageThumbnailURL: string
     private _authorName: string
     private _date: ArticleDate

     constructor(
          slug: Slug,
          title: string,
          excerpt: string,
          imageThumbnailURL: string,
          authorName: string,
          date: ArticleDate
     ) {
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

     public get date(): ArticleDate {
          return this._date
     }
}
export type ProgramSnapshots = ProgramSnapshot[]