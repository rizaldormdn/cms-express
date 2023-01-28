import Article from "../entity/Article";

type Author = {
  name: string;
};

export default interface ArticleRepository {
  getArticles(author: Author): Promise<Article[]>;
  getArticle(slug: string): Promise<Article>;
  saveArticle(article: Article): Promise<void>;
  updateArticle(article: Article): Promise<void>;
  deleteArticle(slug: string): Promise<void>;
}
