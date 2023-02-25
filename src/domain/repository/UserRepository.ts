import Email from '../valueobject/Email'
import Author  from '../entity/Author'
import User from '../entity/User'

export default interface UserRepository{
  getUser(email: Email): Promise<User>
  getUserByToken(token: string): Promise<User>
  saveAuthor(author: Author): Promise<void>
  updateUser(user: User): Promise<void>
  deleteAuthor(email: Email): Promise<void>
}