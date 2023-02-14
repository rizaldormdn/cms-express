import { Connection } from "mysql2";
import Article from "../../../domain/aggregate/Article";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import Author from "../../../domain/entity/Author";
import ArticleSnapshot, { ArticleSnapshots } from "../../../domain/valueobject/ArticleSnapshot";
import Slug from "../../../domain/valueobject/Slug";
import Content from "../../../domain/valueobject/Content";
import Image from "../../../domain/entity/Image";
import Name from "../../../domain/valueobject/Name";
import Tag, { Tags } from "../../../domain/valueobject/Tag";
import ArticleDate from "../../../domain/valueobject/ArticleDate";
import Specification from "../../../application/valueobject/Specification";

export default class ArticleRepository implements ArticleRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  getFeaturedArticles(): Promise<ArticleSnapshots> {
    return new Promise<ArticleSnapshots>((resolve, reject) => {
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at,
          articles.updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        ORDER BY articles.updated_at DESC LIMIT ?
      `

      this._connection.query(
        query,
        [Number(process.env.LIMIT_FEATURED_ARTICLES)],
        (err: any | null, result: any) => {
          if (err) reject(err);
          if (result.length > 0) {
            let featuredArticles: ArticleSnapshots = []

            for (let entry of result) {
              let tags: Tags = []
              for (let tag of entry.tags.split(',')) {
                tags.push(new Tag(tag))
              }
  
              let featuredArticle = new ArticleSnapshot(
                new Slug().rebuild(entry.slug),
                entry.title,
                entry.excerpt,
                entry.thumbnail_url,
                new Name(entry.first_name, entry.last_name).full(),
                tags,
                new ArticleDate(
                  new Date(entry.created_at),
                  new Date(entry.updated_at)
                )
              )
    
              featuredArticles.push(featuredArticle)
            }

            resolve(featuredArticles)
          }
        }
      )
    });
  }

  getArticles(specification: Specification): Promise<ArticleSnapshots> {
    return new Promise<ArticleSnapshots>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_ARTICLES)
      let offset = (specification.page - 1) * limit
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at,
          articles.updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE title LIKE ?
        ORDER BY articles.updated_at DESC LIMIT ?, ?
      `

      this._connection.query(
        query,
        [`%${specification.search}%`, offset, limit],
        (err: any | null, result: any) => {
          if (err) reject(err);
          if (result.length > 0) {
            let featuredArticles: ArticleSnapshots = []

            for (let entry of result) {
              let tags: Tags = []
              for (let tag of entry.tags.split(',')) {
                tags.push(new Tag(tag))
              }
  
              let featuredArticle = new ArticleSnapshot(
                new Slug().rebuild(entry.slug),
                entry.title,
                entry.excerpt,
                entry.thumbnail_url,
                new Name(entry.first_name, entry.last_name).full(),
                tags,
                new ArticleDate(
                  new Date(entry.created_at),
                  new Date(entry.updated_at)
                )
              )
    
              featuredArticles.push(featuredArticle)
            }

            resolve(featuredArticles)
          }
        }
      )
    });
  }

  getArticlesByAuthor(specification: Specification, author: Author): Promise<ArticleSnapshots> {
    return new Promise<ArticleSnapshots>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_ARTICLES)
      let offset = (specification.page - 1) * limit
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at,
          articles.updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE title LIKE ? AND author_email = ?
        ORDER BY articles.updated_at DESC LIMIT ?, ?
      `

      this._connection.query(
        query,
        [`%${specification.search}%`, author.email.string(), offset, limit],
        (err: any | null, result: any) => {
          if (err) reject(err);
          if (result.length > 0) {
            let featuredArticles: ArticleSnapshots = []

            for (let entry of result) {
              let tags: Tags = []
              for (let tag of entry.tags.split(',')) {
                tags.push(new Tag(tag))
              }
  
              let featuredArticle = new ArticleSnapshot(
                new Slug().rebuild(entry.slug),
                entry.title,
                entry.excerpt,
                entry.thumbnail_url,
                new Name(entry.first_name, entry.last_name).full(),
                tags,
                new ArticleDate(
                  new Date(entry.created_at),
                  new Date(entry.updated_at)
                )
              )
    
              featuredArticles.push(featuredArticle)
            }

            resolve(featuredArticles)
          }
        }
      )
    });
  }

  getArticle(slug: Slug): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {
      this._connection.query(
        "SELECT slug, content, image, author, tags, relatedArticles, date FROM article WHERE slug = ?",
        [slug.value],
        (err: any | null, result: any) => {
          if (err) reject(err);
          if (result.length > 0) {
            resolve(new Article(
              slug,
              new Content(result.title, result.content, result.excerpt),
              new Image(result.url, result.alt, result.dimension),
              new Author(result[0].email, result[0].name, result[0].password) as any, 
              result.tags,
              result.relatedArticles,
              result.date
            ))
          }
        }
      )
    });
  }

  saveArticle(article: Article): Promise<void> {
    return new Promise<void>((resolve, reject) => {});
  }

  updateArticle(article: Article): Promise<void> {
    return new Promise<void>((resolve, reject) => {});
  }

  deleteArticle(slug: Slug): Promise<void> {
    return new Promise<void>((resolve, reject) => {});
  }
}
