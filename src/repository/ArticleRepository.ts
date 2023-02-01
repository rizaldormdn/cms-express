import Article, { Articles } from '../entity/Article'

export interface ArticleRepository{
    getArticles(author: string):Promise<Articles>
    getArticle(slug:string):Promise<Article>
    saveArticle(article:Article):Promise<void>
    updateArticle(article:Article):Promise<void>
    deleteArticle(slug:string):Promise<void>
}