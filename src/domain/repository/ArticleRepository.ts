import Author from '../entity/Author'
import Article from '../aggregate/Article'
import { ArticleSnapshots } from '../valueobject/ArticleSnapshot'
import Slug from '../valueobject/Slug'

export default interface ArticleRepository{
  getFeaturedArticles(): Promise<ArticleSnapshots>
  getArticles(author: Author): Promise<ArticleSnapshots>
  getArticle(slug: Slug): Promise<Article>
  saveArticle(article: Article): Promise<void>
  updateArticle(article: Article): Promise<void>
  deleteArticle(slug: Slug): Promise<void>
}