import Article from '../aggregate/Article'
import { ArticleSnapshots } from '../valueobject/ArticleSnapshot'
import Slug from '../valueobject/Slug'
import Specification from '../../application/valueobject/Specification'
import Email from '../valueobject/Email'

export default interface ArticleRepository{
  countArticles(specification: Specification): Promise<number>
  countArticlesByAuthor(specification: Specification, authorEmail: Email): Promise<number>
  getFeaturedArticles(): Promise<ArticleSnapshots>
  getArticles(specification: Specification): Promise<ArticleSnapshots>
  getArticlesByAuthor(specification: Specification, authorEmail: Email): Promise<ArticleSnapshots>
  getArticle(slug: Slug): Promise<Article>
  saveArticle(article: Article): Promise<void>
  updateArticle(article: Article): Promise<void>
  deleteArticle(slug: Slug, email: Email): Promise<void>
}