import Email from "./user/domain/valueobject/Email";
import Name from "./user/domain/valueobject/Name";
import Password from "./user/domain/valueobject/Password";
import Author from "./user/domain/entity/Author";
import Content from "./article/domain/valueobject/Content";
import Dimension from "./image/domain/valueobject/Dimension";
import ImageURL from "./image/domain/valueobject/ImageURL";
import Image from "./image/domain/entity/Image";
import Article from "./article/domain/aggregate/Article";
import Tag, { Tags } from "./article/domain/valueobject/Tag";
import Slug from "./article/domain/valueobject/Slug";
import ArticleDate from "./article/domain/valueobject/ArticleDate";
import ArticleSnapshot, { ArticleSnapshots } from "./article/domain/valueobject/ArticleSnapshot";
import Administrator from "./user/domain/entity/Administrator";
import ResetPasswordToken from "./user/domain/valueobject/ResetPasswordToken";
import User from "./user/domain/entity/User";
import UserRepository from "./user/domain/repository/UserRepository";
import ImageRepository from "./image/domain/repository/ImageRepository";
import ArticleRepository from "./article/domain/repository/ArticleRepository";
import UserService from "./user/application/service/UserService";
import ConfirmationService from "./user/application/service/ConfirmationService";
import AdministratorService from "./user/application/service/AdministratorService";
import ResetPasswordService from "./user/application/service/ResetPasswordService";
import ArticleService from "./article/domain/service/ArticleService";
import Specification from "./Specification";
import ImageService from "./image/application/service/ImageService";

let now = new Date();
let old = new Date();

now.setHours(new Date().getHours() + 1)
old.setHours(new Date().getHours() - 1)

export const email: Email = new Email("test@example.com");
export const authorEmail: Email = new Email("author@example.com");
export const name: Name = new Name("John", "Doe");
export const authorName = "John Doe"
export const password: Password = new Password("$2b$10$LPWgQolfuVYRiZ9wQAtPnO", "$2b$10$LPWgQolfuVYRiZ9wQAtPnOKMcoi2EhwYTm..MmQLIKtJ/PpXtNZym");
export const token = "abc123"
export const tokenExpiry = now
export const tokenExpired = old
export const resetPasswordToken: ResetPasswordToken = new ResetPasswordToken(token, tokenExpiry)
export const invalidResetPasswordToken: ResetPasswordToken = new ResetPasswordToken(token, tokenExpired)
export const user: User = new User(email, name, password, resetPasswordToken, false);
export const author: Author = new Author(authorEmail, name, password, resetPasswordToken);
export const authorWithoutResetPasswordToken: Author = new Author(email, name, password);
export const title = "This is title"
export const excerpt = "This is excerpt."
export const content = new Content(title, "<p>This is content.</p>", excerpt)
export const dimension = new Dimension(1920, 1080)
export const imageThumbnailURL = "http://example.com/thumbnail.jpg"
export const imageURL = new ImageURL("http://example.com/original.jpg", imageThumbnailURL)
export const alt = "A sample image"
export const image = new Image(imageURL, alt, dimension, email.string())
export const tags: Tags = [
  new Tag("tag1"),
  new Tag("tag2"),
  new Tag("tag3")
]
export const article: Article = author.addArticle(content, image, tags)
export const otherArticle: Article = new Article(article.slug, content, image, author.name.full(), "other@example.com", tags)
export const slug = new Slug("this-is-title-abc123")
export const articleDate = new ArticleDate()
export const articleSnapshot = new ArticleSnapshot(slug, title, excerpt, imageThumbnailURL, authorName, tags, articleDate)
export const articleSnapshots: ArticleSnapshots = [ articleSnapshot ]
export const administrator: Administrator = new Administrator(email, name, password, resetPasswordToken);
export const specification = new Specification("", 1)
export const userRepository: UserRepository = {
  getAuthors: jest.fn(),
  getUser: jest.fn(),
  getUserByToken: jest.fn(),
  saveAuthor: jest.fn(),
  updateUser: jest.fn(),
  deleteAuthor: jest.fn()
}
export const imageRepository: ImageRepository = {
  countImages: jest.fn(),
  countImagesByAuthor: jest.fn(),
  getImages: jest.fn(),
  getImagesByAuthor: jest.fn(),
  getImage: jest.fn(),
  saveImage: jest.fn(),
  updateImage: jest.fn(),
  deleteImage: jest.fn()
}
export const articleRepository: ArticleRepository = {
  countArticles: jest.fn(),
  countArticlesByAuthor: jest.fn(),
  getFeaturedArticles: jest.fn(),
  getArticles: jest.fn(),
  getArticlesByAuthor: jest.fn(),
  getArticle: jest.fn(),
  saveArticle: jest.fn(),
  updateArticle: jest.fn(),
  deleteArticle: jest.fn(),
  deleteArticleWithEmail: jest.fn(),
}
export const userService: UserService = new UserService(userRepository);
export const imageService: ImageService = new ImageService(imageRepository);
export const articleService: ArticleService = new ArticleService(articleRepository)
export const confirmationService: ConfirmationService = {
  sendConfirmation: jest.fn()
} 
export const administratorService: AdministratorService = new AdministratorService(userRepository, confirmationService)
export const resetPasswordService: ResetPasswordService = new ResetPasswordService(userRepository)