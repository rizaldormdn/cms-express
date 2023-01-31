export default class ArticleDate {
     private _createdAt: Date
     private _updatedAt: Date

<<<<<<< HEAD
     constructor(createdAt?: Date, updatedAt?: Date) {
         this._createdAt = createdAt || new Date()
         this._updatedAt = updatedAt || new Date()
=======
     constructor(createdAt: Date, updatedAt: Date) {
          this._createdAt = createdAt
          this._updatedAt = updatedAt
>>>>>>> a97dbfb09ec3c60ad8275b4edb05a98036c71235
     }
     public get createdAt(): Date {
          return this._createdAt
     }
     public get updatedAt(): Date {
          return this._updatedAt
     }
<<<<<<< HEAD
     public update(updatedAt: Date): void {
          this._updatedAt = updatedAt
     }
=======
>>>>>>> a97dbfb09ec3c60ad8275b4edb05a98036c71235
}