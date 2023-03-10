require("dotenv").config();
import { Connection } from 'mysql2';
import ArticleDate from '../../../../article/domain/valueobject/ArticleDate';
import Content from '../../../../article/domain/valueobject/Content';
import Slug from '../../../../article/domain/valueobject/Slug';
import Image from '../../../../image/domain/entity/Image';
import Dimension from '../../../../image/domain/valueobject/Dimension';
import ImageURL from '../../../../image/domain/valueobject/ImageURL';
import Specification from '../../../../Specification';
import Name from '../../../../user/domain/valueobject/Name';
import Program from '../../../domain/aggregate/Program';
import * as ProgramRepositoryInterface from '../../../domain/repository/ProgramRepository';
import ProgramSnapshot, { ProgramSnapshots } from '../../../domain/valueobject/ProgramSnapshot';

export default class ProgramRepository implements ProgramRepositoryInterface.default {
  private _connection: Connection

  constructor(connection: Connection) {
    this._connection = connection
  }

  public getFeaturedProgram(): Promise<ProgramSnapshots> {
    return new Promise<ProgramSnapshots>((resolve, reject) => {
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          program.created_at AS created_at,
          program.updated_at AS updated_at
        FROM program
        JOIN images ON images.id = program.image_id
        JOIN users ON users.email = program.author_email
        ORDER BY program.updated_at DESC LIMIT ?`
      this._connection.query(query, [Number(process.env.LIMIT_FEATURED_PROGRAM)], (err: any | null, result: any) => {
        if (err) {
          console.error(err);
          reject(new Error('failed get featured program'))
        }
        if (result.length > 0) {
          let featuredPrograms: ProgramSnapshots = []
          for (let entry of result) {
            let featuredProgram = new ProgramSnapshot(
              new Slug().rebuild(entry.slug),
              entry.title,
              entry.excerpt,
              entry.thumbnail_url,
              new Name(entry.first_name, entry.last_name).full(),
              new ArticleDate(
                new Date(entry.created_at),
                new Date(entry.updated_at)
              )
            )
            featuredPrograms.push(featuredProgram)
          }
          resolve(featuredPrograms)
        }
      })
    })
  }

  public saveProgram(program: Program): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let query = 'INSERT INTO program (slug, title, content, excerpt, image_id, author_email) VALUES (?, ?, ?, ?, UUID_TO_BIN(?), ?)'
      this._connection.query(query,
        [
          program.slug.value,
          program.content.title,
          program.content.content,
          program.content.excerpt,
          program.image.id,
          program.authorEmail
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)
            reject(new Error('failed save an program'))
          }
          resolve(result)
        })
    })
  }

  public countProgram(specification: Specification): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._connection.query(
        "SELECT COUNT(slug) AS total FROM program WHERE title LIKE ?",
        [`%${specification.search}%`],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed count program'));
          }
          if (result.length > 0) {
            resolve(Number(result[0].total))
          }
        }
      )
    })
  }

  public getPrograms(specification: Specification): Promise<ProgramSnapshots> {
    return new Promise<ProgramSnapshots>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_PROGRAM)
      let offset: number = (specification.page - 1) * limit
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          program.created_at AS created_at,
          program.updated_at AS updated_at
        FROM program
        JOIN images ON images.id = program.image_id
        JOIN users ON users.email = program.author_email
        WHERE title LIKE ?
        ORDER BY program.updated_at DESC LIMIT ?, ?
      `
      this._connection.query(query, [`%${specification.search}%`, offset, limit],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error('failed get program'))
          }
          if (result.length > 0) {
            let programs: ProgramSnapshots = []
            for (let entry of result) {
              let program = new ProgramSnapshot(
                new Slug().rebuild(entry.slug),
                entry.title,
                entry.excerpt,
                entry.thumbnail_url,
                new Name(entry.first_name, entry.last_name).full(),
                new ArticleDate(
                  new Date(entry.created_at),
                  new Date(entry.updated_at)
                )
              )
              programs.push(program)
            }
            resolve(programs)
          }
        })
    })
  }
  public getProgram(slug: Slug): Promise<Program> {
    return new Promise<Program>((resolve, reject) => {
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
          is_published,
          program.created_at AS created_at,
          program.updated_at AS updated_at
        FROM program
        JOIN images ON images.id = program.image_id
        JOIN users ON users.email = program.author_email
        WHERE slug = ? LIMIT 1
    `
      this._connection.query(
        query,
        [slug.value],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed get an program'))
          }
          if (result.length > 0) {
            resolve(new Program(
              slug,
              new Content(result[0].title, result[0].content, result[0].excerpt),
              new Image(
                new ImageURL(result[0].original_url, result[0].thumbnail_url),
                result[0].alt,
                new Dimension(result[0].height, result[0].width),
                result[0].email,
                result[0].id
              ),
              new Name(result[0].first_name, result[0].last_name).full(),
              result[0].email,
              result[0].is_published,
              new ArticleDate(result[0].created_at, result[0].updated_at)
            ))
          }
        })
    })
  }
}