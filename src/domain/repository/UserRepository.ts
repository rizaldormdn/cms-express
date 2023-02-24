import Administrator  from '../entity/Administrator'
import Email from '../valueobject/Email'
import Author  from '../entity/Author'
import User from '../entity/User'

export default interface UserRepository{
  getUser(email: Email): Promise<Administrator | Author>
  saveAuthor(author: Author): Promise<void>
  updateUser(user: User): Promise<void>
  deleteAuthor(email: Email): Promise<void>
}