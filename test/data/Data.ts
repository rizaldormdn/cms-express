import Email from "../../src/domain/valueobject/Email";
import Name from "../../src/domain/valueobject/Name";
import Password from "../../src/domain/valueobject/Password";
import Author from "../../src/domain/entity/Author";
import Content from "../../src/domain/valueobject/Content";
import Dimension from "../../src/domain/valueobject/Dimension";
import ImageURL from "../../src/domain/valueobject/ImageURL";
import Image from "../../src/domain/entity/Image";
import Article from "../../src/domain/aggregate/Article";
import Tag, { Tags } from "../../src/domain/valueobject/Tag";

export const email: Email = new Email("test@example.com");
export const name: Name = new Name("John Doe");
export const password: Password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
export const author: Author = new Author(email, name, password);
export const content = new Content("This is title", "This is content", "This is excerpt")
export const dimension = new Dimension(1920, 1080)
export const imageURL = new ImageURL("http://example.com/original.jpg", "http://example.com/thumbnail.jpg")
export const image = new Image(imageURL, "A sample image", dimension)
export const tags: Tags = [
  new Tag("tag1"),
  new Tag("tag2"),
  new Tag("tag3")
]
export const article: Article = author.addArticle(content, image, tags)