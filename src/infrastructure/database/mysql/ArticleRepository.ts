import { Connection } from "mysql2";
import Specification from "../../../application/valueobject/Specification";
import Article from "../../../domain/aggregate/Article";
import Author from "../../../domain/entity/Author";
import Image from "../../../domain/entity/Image";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import ArticleDate from "../../../domain/valueobject/ArticleDate";
import ArticleSnapshot, { ArticleSnapshots } from "../../../domain/valueobject/ArticleSnapshot";
import Content from "../../../domain/valueobject/Content";
import Dimension from "../../../domain/valueobject/Dimension";
import ImageURL from "../../../domain/valueobject/ImageURL";
import Name from "../../../domain/valueobject/Name";
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
      tags += tag
    }

    return tags
  }

  private _getArticle(slug: Slug): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {
      let query = `
        SELECT
          slug,
          title,
          content,
          excerpt,
          BIN_TO_UUID(images.id) AS image_id,
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
                result[0].image_id
              ),
              new Name(result[0].first_name, result[0].last_name).full(),
              result[0].email,
              tags,
              [],
              result[0].is_published,
              new ArticleDate(result[0].created_at, result[0].updated_at)
            ))
          }
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
          if (result.length > 0) {
            let relatedArticles: ArticleSnapshots = []

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

            resolve(relatedArticles)
          }
        }
      )
    })
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
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
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
          if (err) {
            console.error(err);

            reject(new Error('failed get articles by author'));
          }
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
    return new Promise<Article>(async (resolve, reject) => {
      try {
        let article = await this._getArticle(slug)
        let relatedArticles = await this._getRelatedArticle(article)

        resolve(new Article(
          article.slug,
          article.content,
          article.image,
          article.authorName,
          article.authorEmail,
          article.tags,
          relatedArticles,
          article.isPublished,
          article.date,
        ))
      } catch (err) {
        reject(err);
      }
    });
  }

  saveArticle(article: Article): Promise<void> {
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

  updateArticle(article: Article): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'UPDATE articles SET content = ?, excerpt = ?, image_id = ?, tags = ?) VALUES (?, ?, UUID_TO_BIN(?), ?) WHERE slug = ? AND author_email = ?',
        [
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

  deleteArticle(slug: Slug): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        'DELETE FROM articles WHERE slug = ?',
        [
          slug.value
        ],
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
