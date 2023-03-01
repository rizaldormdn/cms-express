import Email from '../../../user/domain/valueobject/Email'
import Author from '../entity/Author'
import { AuthorSnapshots } from '../../application/valueobject/AuthorSnapshot'
import User from '../entity/User'

export default interface UserRepository{
  getAuthors(): Promise<AuthorSnapshots>
  getUser(email: Email): Promise<User | undefined>
  getUserByToken(token: string): Promise<User | undefined>
  saveAuthor(author: Author): Promise<void>
  updateUser(user: User): Promise<void>
  deleteAuthor(email: Email): Promise<void>
}