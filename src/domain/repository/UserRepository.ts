import Email from '../valueobject/Email'
import Author from '../entity/Author'
import { AuthorSnapshots } from '../../application/valueobject/AuthorSnapshot'
import User from '../entity/User'

export default interface UserRepository{
  getAuthors(): Promise<AuthorSnapshots>
  getUser(email: Email): Promise<User>
  getUserByToken(token: string): Promise<User>
  saveAuthor(author: Author): Promise<void>
  updateUser(user: User): Promise<void>
  deleteAuthor(email: Email): Promise<void>
}