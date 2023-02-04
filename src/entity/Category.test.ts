import Category from "./Category";
import Content from "../valueobject/Content";
import Dimension from "../valueobject/Dimension";
import Image from "./Image";
import Article, { Articles } from "./Article";
import ArticleDate from "../valueobject/ArticleDate";

describe("Category", () => {
  let category = new Category("Default", []);

  it("should set the name when constructed", () => {
    expect(category.name).toBe("Default");
  });

  it("should generate a unique id when constructed", () => {
    const category1 = new Category("Test Category 1", []);
    const category2 = new Category("Test Category 2", []);
  
    expect(category1.id).not.toBe(category2.id);
  });

  it("should throw an error when constructed with an empty name", () => {
    expect(() => new Category("", [])).toThrowError("name cannot be empty");
  });

  it("should be able to add articles", () => {
    let content = new Content("This is title", "This is content", "This is excerpt");
    let dimension = new Dimension(1200, 630);
    let image = new Image("http://example.com/image.jpg", "A sample image", dimension, []);
    let author = "John Doe"
    let category = new Category("Default", [])
    let relatedArticles: Articles = []
    let date = new ArticleDate()
    let article = new Article(content, image, author, category, relatedArticles, date);

    category.addArticle(article);

    expect(category.articles).toContain(article);
  });
});
