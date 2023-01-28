export default class ArticleDate {
     private _createdAt: Date
     private _updatedAt: Date

     constructor(createdAt: Date, updatedAt: Date) {
          this._createdAt = createdAt
          this._updatedAt = updatedAt
     }
     public get createdAt(): Date {
          return this._createdAt
     }
     public get updatedAt(): Date {
          return this._updatedAt
     }
}