import Email from "./domain/valueobject/Email";
import Name from "./domain/valueobject/Name";
import Password from "./domain/valueobject/Password";
import Author from "./domain/entity/Author";
import Content from "./domain/valueobject/Content";
import Dimension from "./domain/valueobject/Dimension";
import ImageURL from "./domain/valueobject/ImageURL";
import Image from "./domain/entity/Image";
import Article from "./domain/aggregate/Article";
import Tag, { Tags } from "./domain/valueobject/Tag";
import Slug from "./domain/valueobject/Slug";
import ArticleDate from "./domain/valueobject/ArticleDate";
import ArticleSnapshot from "./domain/valueobject/ArticleSnapshot";
import Administrator from "./domain/entity/Administrator";
import ResetPasswordToken from "./domain/valueobject/ResetPasswordToken";

let now = new Date();

now.setHours(new Date().getHours() + 1)

export const email: Email = new Email("test@example.com");
export const authorEmail: Email = new Email("author@example.com");
export const name: Name = new Name("John Doe");
export const authorName = "John Doe"
export const password: Password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
export const token = "abc123"
export const tokenExpiry = now
export const resetPasswordToken: ResetPasswordToken = new ResetPasswordToken(token, tokenExpiry)
export const author: Author = new Author(email, name, password, resetPasswordToken);
export const title = "This is title"
export const excerpt = "This is excerpt."
export const content = new Content(title, "<p>This is content.</p>", excerpt)
export const dimension = new Dimension(1920, 1080)
export const imageThumbnailURL = "http://example.com/thumbnail.jpg"
export const imageURL = new ImageURL("http://example.com/original.jpg", imageThumbnailURL)
export const alt = "A sample image"
export const image = new Image(imageURL, alt, dimension)
export const tags: Tags = [
  new Tag("tag1"),
  new Tag("tag2"),
  new Tag("tag3")
]
export const article: Article = author.addArticle(content, image, tags)
export const slug = new Slug("this-is-title-abc123")
export const articleDate = new ArticleDate()
export const articleSnapshot = new ArticleSnapshot(slug, title, excerpt, imageThumbnailURL, authorName, tags, articleDate)
export const administrator: Administrator = new Administrator(email, name, password, resetPasswordToken);