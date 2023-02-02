import Author from "./Author";
import Article, { Articles } from "../entity/Article";
import Email from "../valueobject/Email";
import Name from "../valueobject/Name";
import Password from "../valueobject/Password";

import Content from "../valueobject/Content";
import Category from "../entity/Category";
import Image from "../entity/Image";
import ArticleDate from "../valueobject/ArticleDate";

import Dimension from "../valueobject/Dimension";
import Thumbnail from "../entity/Thumbnail";

import ThumbnailCategory from "../entity/ThumbnailCategory";

describe("email, name, password value object", () => {
  let dimension = new Dimension(20, 20);

  let thumbnailCategory = new ThumbnailCategory("ThumbnailCategory", dimension);

  let thumbnail = new Thumbnail("url/example", thumbnailCategory);

  let content = new Content("title", "content", "excerp");
  let category = new Category("name");
  let image = new Image("url/example/image", "image", dimension, thumbnail);

  let date = new ArticleDate();

  let article = new Article(content, "author", category, image, date);
  let email = new Email("test@example.com");
  let name = new Name("John Doe");
  let password = new Password("$2b$10$WCZ6j4PLICecyCYvBvL7We");
  let author = new Author(article, email, name, password);

  test('email local of "test" should be "test"', () => {
    expect(author.email.local).toBe("test");
  });
});
