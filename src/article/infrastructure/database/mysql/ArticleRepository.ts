require("dotenv").config();

import { Connection } from "mysql2";
import Specification from "../../../../Specification";
import Article from "../../../domain/aggregate/Article";
import Image from "../../../../image/domain/entity/Image";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import ArticleDate from "../../../domain/valueobject/ArticleDate";
import ArticleSnapshot, { ArticleSnapshots } from "../../../domain/valueobject/ArticleSnapshot";
import Content from "../../../domain/valueobject/Content";
import Dimension from "../../../../image/domain/valueobject/Dimension";
import Email from "../../../../user/domain/valueobject/Email";
import ImageURL from "../../../../image/domain/valueobject/ImageURL";
import Name from "../../../../user/domain/valueobject/Name";
import Slug from "../../../domain/valueobject/Slug";
import Tag, { Tags } from "../../../domain/valueobject/Tag";

export default class ArticleRepository implements ArticleRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  private _tags(_tags: Tags): string {
    let tags = ""
    for (let tag of _tags) {
      if (tags !== "") {
        tags += ","
      }
      tags += tag.value
    }

    return tags
  }

  private _getArticle(slug: Slug): Promise<Article | undefined> {
    return new Promise<Article | undefined>((resolve, reject) => {
      let query = `
        SELECT
          slug,
          title,
          content,
          excerpt,
          BIN_TO_UUID(image_id) AS image_id,
          original_url,
          thumbnail_url,
          alt,
          height,
          width,
          first_name,
          last_name,
          email,
          tags,
          is_published,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE slug = ? LIMIT 1
      `

      this._connection.query(
        query,
        [slug.value],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get an article'));
          }
          if (result.length > 0) {
            let tags: Tags = []
            if (result[0].tags.length > 1) {
              for (let tag of result[0].tags.split(',')) {
                tags.push(new Tag(tag))
              }
            }

            resolve(new Article(
              slug,
              new Content(result[0].title, result[0].content, result[0].excerpt),
              new Image(
                new ImageURL(result[0].original_url, result[0].thumbnail_url),
                result[0].alt,
                new Dimension(result[0].height, result[0].width),
                result.email,
                result[0].image_id
              ),
              new Name(result[0].first_name, result[0].last_name).full(),
              result[0].email,
              tags,
              result[0].is_published,
              new ArticleDate(result[0].created_at, result[0].updated_at),
            ))
          }

          resolve(undefined)
        }
      )
    })
  }

  private _getRelatedArticle(article: Article): Promise<ArticleSnapshots> {
    return new Promise<ArticleSnapshots>((resolve, reject) => {
      if (article.tags.length <= 0) {
        resolve([])
      }

      let tagsQuery = ''
      let tagValues: string[] = []

      for (let i = 0; i < article.tags.length; i++) {
        if (tagsQuery !== '') {
          tagsQuery += ' OR '
        }
        tagsQuery += 'tags LIKE ?'

        if (i <= 0) {
          tagValues.push(`${article.tags[i].value},%`)
        } else if (i >= article.tags.length - 1) {
          tagValues.push(`%,${article.tags[i].value}`)
        } else {
          tagValues.push(`%,${article.tags[i].value},%`)
        }
      }

      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE slug != ? AND (${tagsQuery})
        ORDER BY articles.updated_at DESC LIMIT ?
      `

      this._connection.query(
        query,
        [article.slug.value, ...tagValues, Number(process.env.LIMIT_RELATED_ARTICLES)],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get related articles'));
          }

          let relatedArticles: ArticleSnapshots = []
  
          if (result.length > 0) {
            for (let entry of result) {
              let tags: Tags = []
              for (let tag of entry.tags.split(',')) {
                tags.push(new Tag(tag))
              }

              let relatedArticle = new ArticleSnapshot(
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

              relatedArticles.push(relatedArticle)
            }
          }

          resolve(relatedArticles)
        }
      )
    })
  }

  public countArticles(specification: Specification): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._connection.query(
        "SELECT COUNT(slug) AS total FROM articles WHERE title LIKE ?",
        [`%${specification.search}%`],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed count articles'));
          }
          if (result.length > 0) {
            resolve(Number(result[0].total))
          }

          resolve(0)
        }
      )
    })
  }

  public countArticlesByAuthor(specification: Specification, authorEmail: Email): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._connection.query(
        "SELECT COUNT(slug) AS total FROM articles WHERE title LIKE ? AND author_email = ?",
        [`%${specification.search}%`, authorEmail.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed count articles by author'));
          }
          if (result.length > 0) {
            resolve(Number(result[0].total))
          }

          resolve(0)
        }
      )
    })
  }

  public getFeaturedArticles(): Promise<ArticleSnapshots> {
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
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        ORDER BY articles.updated_at DESC LIMIT ?
      `

      this._connection.query(
        query,
        [Number(process.env.LIMIT_FEATURED_ARTICLES)],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get featured articles'));
          }

          let featuredArticles: ArticleSnapshots = []

          if (result.length > 0) {
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
          }

          resolve(featuredArticles)
        }
      )
    });
  }

  public getArticles(specification: Specification): Promise<ArticleSnapshots> {
    return new Promise<ArticleSnapshots>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_ARTICLES)
      let offset: number = (specification.page - 1) * limit
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
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
          if (err) {
            console.error(err);

            reject(new Error('failed get articles'));
          }

          let articles: ArticleSnapshots = []

          if (result.length > 0) {
            for (let entry of result) {
              let tags: Tags = []
              for (let tag of entry.tags.split(',')) {
                tags.push(new Tag(tag))
              }

              let article = new ArticleSnapshot(
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

              articles.push(article)
            }
          }

          resolve(articles)
        }
      )
    });
  }

  public getArticlesByAuthor(specification: Specification, authorEmail: Email): Promise<ArticleSnapshots> {
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
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE title LIKE ? AND articles.author_email = ?
        ORDER BY articles.updated_at DESC LIMIT ?, ?
      `

      this._connection.query(
        query,
        [`%${specification.search}%`, authorEmail.string(), offset, limit],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get articles by author'));
          }

          let featuredArticles: ArticleSnapshots = []

          if (result.length > 0) {
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
          }

          resolve(featuredArticles)
        }
      )
    });
  }

  public getArticle(slug: Slug): Promise<Article | undefined> {
    return new Promise<Article | undefined>(async (resolve, reject) => {
      try {
        let article: Article | undefined = await this._getArticle(slug)

        if (!article) {
          resolve(undefined)

          return
        }

        let relatedArticles = await this._getRelatedArticle(article)

        resolve(new Article(
          article.slug,
          article.content,
          article.image,
          article.authorName,
          article.authorEmail,
          article.tags,
          article.isPublished,
          article.date,
          relatedArticles
        ))
      } catch (err) {
        reject(err);
      }
    });
  }

  public saveArticle(article: Article): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'INSERT INTO articles (slug, title, content, excerpt, image_id, author_email, tags) VALUES (?, ?, ?, ?, UUID_TO_BIN(?), ?, ?)',
        [
          article.slug.value,
          article.content.title,
          article.content.content,
          article.content.excerpt,
          article.image.id,
          article.authorEmail,
          this._tags(article.tags)
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('faield save an article'))
          }

          resolve(result);
        }
      )
    });
  }

  public updateArticle(article: Article): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'UPDATE articles SET title = ?, content = ?, excerpt = ?, image_id = UUID_TO_BIN(?), tags = ? WHERE slug = ? AND author_email = ?',
        [
          article.content.title,
          article.content.content,
          article.content.excerpt,
          article.image.id,
          this._tags(article.tags),
          article.slug.value,
          article.authorEmail
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed update an article'))
          }

          resolve(result);
        }
      )
    });
  }

  public updatePublishedArticle(slug: Slug, authorEmail: Email, isPublished: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'UPDATE articles SET is_published = ? WHERE slug = ? AND author_email = ?',
        [
          isPublished,
          slug.value,
          authorEmail.string()
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed update an published article'))
          }

          resolve(result);
        }
      )
    });
  }

  public deleteArticle(slug: Slug): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'DELETE FROM articles WHERE slug = ?',
        [slug.value],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed delete an article'))
          }

          resolve(result);
        }
      )
    });
  }

  public deleteArticleWithEmail(slug: Slug, email: Email): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'DELETE FROM articles WHERE slug = ? AND author_email = ?',
        [slug.value, email.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed delete an article'))
          }

          resolve(result);
        }
      )
    });
  }
}
