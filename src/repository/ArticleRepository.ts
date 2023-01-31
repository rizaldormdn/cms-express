import Author  from '../aggregate/Author'
import Article  from '../entity/Article'

export interface ArticleRepository{
    getArticles(Author):Promise<Article>
    getArticle(slug:string):Promise<Article>
    saveArticle(Article):Promise<void>
    updateArticle(Article):Promise<void>
    deleteArticle(slug:string):Promise<void>
}