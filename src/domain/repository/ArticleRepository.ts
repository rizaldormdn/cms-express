import Author from '../aggregate/Author'
import Article, { Articles } from '../entity/Article'

export default interface ArticleRepository{
  getArticles(author: Author): Promise<Articles>
  getArticle(slug: string): Promise<Article>
  saveArticle(article: Article): Promise<void>
  updateArticle(article: Article): Promise<void>
  deleteArticle(slug: string): Promise<void>
}