import ArticleRepository from "./ArticleRepository";
import Article from "../entity/Article";
import Category from "../entity/Category";

type Author = {
  name: string;
};

class ArticleRepositoryImpl implements ArticleRepository {
  private articles: Article[] = [];

  async getArticles(author: Author): Promise<Article[]> {
    return this.articles.filter((article) => article.author === author);
  }

  async getArticle(slug: string): Promise<Article> {
    const article = this.articles.find((article) => article.slug === slug);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  }

  async saveArticle(article: Article): Promise<void> {
    this.articles.push(article);
  }

  async updateArticle(article: Article): Promise<void> {
    const index = this.articles.findIndex((a) => a.slug === article.slug);
    this.articles[index] = article;
  }

  async deleteArticle(slug: string): Promise<void> {
    this.articles = this.articles.filter((article) => article.slug !== slug);
  }
}

describe("ArticleRepository", () => {
  let repository: ArticleRepository;
  let category = new Category("test-category");
  beforeEach(() => {
    repository = new ArticleRepositoryImpl();
  });

  describe("getArticles", () => {
    it("should return an array of articles", async () => {
      const author = { name: "John Doe" };
      const articles = [
        new Article(
          "slug-1",
          {
            title: "Article 1",
            content: "Content 1",
            excerpt: "Excerpt 1",
            image: "image-1.jpg",
          },
          author,
          category,
          { createdAt: new Date(), updatedAt: new Date() }
        ),
        new Article(
          "slug-2",
          {
            title: "Article 2",
            content: "Content 2",
            excerpt: "Excerpt 2",
            image: "image-2.jpg",
          },
          author,
          category,
          { createdAt: new Date(), updatedAt: new Date() }
        ),
      ];
      articles.forEach((article) => repository.saveArticle(article));
      const result = await repository.getArticles(author);
      expect(result).toEqual(articles);
    });
  });

  describe("getArticle", () => {
    it("should return an article with the specified slug", async () => {
      const author = { name: "John Doe" };
      const article = new Article(
        "slug-1",
        {
          title: "Article 1",
          content: "Content 1",
          excerpt: "Excerpt 1",
          image: "image-1.jpg",
        },
        author,
        category,
        { createdAt: new Date(), updatedAt: new Date() }
      );
      repository.saveArticle(article);
      const result = await repository.getArticle("slug-1");
      expect(result).toEqual(article);
    });
  });
  describe("saveArticle", () => {
    it("should save the article", async () => {
      const author = { name: "John Doe" };
      const article = new Article(
        "slug-1",
        {
          title: "Article 1",
          content: "Content 1",
          excerpt: "Excerpt 1",
          image: "image-1.jpg",
        },
        author,
        category,
        { createdAt: new Date(), updatedAt: new Date() }
      );
      await repository.saveArticle(article);
      const result = await repository.getArticle("slug-1");
      expect(result).toEqual(article);
    });
  });

  describe("updateArticle", () => {
    it("should update the article", async () => {
      const author = { name: "John Doe" };
      const article = new Article(
        "slug-1",
        {
          title: "Article 1",
          content: "Content 1",
          excerpt: "Excerpt 1",
          image: "image-1.jpg",
        },
        author,
        category,
        { createdAt: new Date(), updatedAt: new Date() }
      );
      await repository.saveArticle(article);
      article.content.title = "Updated Title";
      await repository.updateArticle(article);
      const result = await repository.getArticle("slug-1");
      expect(result.content.title).toEqual("Updated Title");
    });
  });

  describe("deleteArticle", () => {
    it("should delete the article", async () => {
      const author = { name: "John Doe" };
      const article = new Article(
        "slug-1",
        {
          title: "Article 1",
          content: "Content 1",
          excerpt: "Excerpt 1",
          image: "image-1.jpg",
        },
        author,
        category,
        { createdAt: new Date(), updatedAt: new Date() }
      );
      await repository.saveArticle(article);
      await repository.deleteArticle("slug-1");
      const result = await repository.getArticle("slug-1");
      expect(result).toBeNull();
    });
  });
});
