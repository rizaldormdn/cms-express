import Administrator  from '../aggregate/Administrator'
import Email from '../valueobject/Email'
import Author  from '../aggregate/Author'

export interface UserRepository{
    getAdministrator(email:Email):Promise<Administrator>
    getAuthor(email:Email):Promise<Author>
    saveAuthor(author:Author):Promise<void>
    updateAuthore(author:Author):Promise<void>
    deleteAuthor(author:Author):Promise<void>
}