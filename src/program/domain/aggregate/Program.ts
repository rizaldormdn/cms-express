import ArticleDate from "../../../article/domain/valueobject/ArticleDate";
import Content from "../../../article/domain/valueobject/Content";
import Slug from "../../../article/domain/valueobject/Slug";
import { Tags } from "../../../article/domain/valueobject/Tag";
import Image from "../../../image/domain/entity/Image";

export default class Program {
     private _slug: Slug
     private _content: Content
     private _image: Image
     private _authorName: string
     private _authorEmail: string
     private _isPublised: boolean = false
     private _date: ArticleDate = new ArticleDate()

     constructor(
          slug: Slug,
          content: Content,
          image: Image,
          authorName: string,
          authorEmail: string,
          isPublished?: boolean,
          date?: ArticleDate
     ) {
          this._slug = slug
          this._content = content
          this._image = image
          this._authorEmail = authorEmail
          this._authorName = authorName

          if (authorName === "") {
               throw new Error("author name cannot be empty")
          }
          if (authorEmail === "") {
               throw new Error("author email cannot be empty")
          }
          if (isPublished !== undefined) {
               this._isPublised = isPublished
          }
          if (date !== undefined) {
               this._date = date
          }
     }

     public get slug(): Slug {
          return this._slug
     }

     public get content(): Content {
          return this._content
     }

     public get image(): Image {
          return this._image
     }

     public get authorName(): string {
          return this._authorName;
     }

     public get authorEmail(): string {
          return this._authorEmail;
     }

     public get isPublished(): boolean {
          return this._isPublised
     }

     public get date(): ArticleDate {
          return this._date
     }

     public publish(): void {
          this._isPublised = true
     }

     public unpublish(): void {
          this._isPublised = false
     }
}
export type Programs = Program[]