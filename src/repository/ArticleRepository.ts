import Article from "../entity/Article";
import Author from "../aggregate/Author";

export default interface ArticleRepository {
  getArticles(author: Author): Promise<Article[]>;
  getArticle(slug: string): Promise<Article>;
  saveArticle(article: Article): Promise<void>;
  updateArticle(article: Article): Promise<void>;
  deleteArticle(slug: string): Promise<void>;
}
