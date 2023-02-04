import Administrator  from '../aggregate/Administrator'
import Email from '../valueobject/Email'
import Author  from '../aggregate/Author'

export default interface UserRepository{
  getAdministrator(email: Email): Promise<Administrator>
  getAuthor(email: Email): Promise<Author>
  saveAuthor(author: Author): Promise<void>
  updateAdministrator(administrator: Administrator): Promise<void>
  updateAuthor(author: Author): Promise<void>
  deleteAuthor(email: Email): Promise<void>
}