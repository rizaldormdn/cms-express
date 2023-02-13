import Author from '../entity/Author'
import Article from '../aggregate/Article'
import { ArticleSnapshots } from '../valueobject/ArticleSnapshot'

export default interface ArticleRepository{
  getFeaturedArticles(): Promise<ArticleSnapshots>
  getArticles(author: Author): Promise<ArticleSnapshots>
  getArticle(slug: string): Promise<Article>
  saveArticle(article: Article): Promise<void>
  updateArticle(article: Article): Promise<void>
  deleteArticle(slug: string): Promise<void>
}