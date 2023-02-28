import { Connection } from "mysql2";
import Image, { Images } from "../../../domain/entity/Image";
import * as ImageRepositoryInterface from "../../../domain/repository/ImageRepository"
import Dimension from "../../../domain/valueobject/Dimension";
import ImageURL from "../../../domain/valueobject/ImageURL";
import Specification from "../../../../Specification";
import Email from "../../../../user/domain/valueobject/Email";

export default class ImageRepository implements ImageRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public countImages(specification: Specification): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._connection.query(
        "SELECT COUNT(id) AS total FROM images WHERE alt LIKE ?",
        [`%${specification.search}%`],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed count images'));
          }
          if (result.length > 0) {
            resolve(Number(result[0].total))
          }
        }
      )
    })
  }

  public countImagesByAuthor(specification: Specification, authorEmail: Email): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._connection.query(
        "SELECT COUNT(id) AS total FROM images WHERE alt LIKE ? AND author_email = ?",
        [`%${specification.search}%`, authorEmail.string()],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);

            reject(new Error('failed count images by author'));
          }
          if (result.length > 0) {
            resolve(Number(result[0].total))
          }
        }
      )
    })
  }

  public getImages(specification: Specification): Promise<Images> {
    return new Promise<Images>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_IMAGES)
      let offset: number = (specification.page - 1) * limit
      let query = `
        SELECT
          BIN_TO_UUID(id) AS id,
          original_url,
          thumbnail_url,
          alt,
          height,
          width,
          author_email
        FROM images
        WHERE alt LIKE ?
        ORDER BY images.updated_at DESC
        LIMIT ?, ?
      `

      this._connection.query(
        query,
        [`%${specification.search}%`, offset, limit],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed get images'))
          }
          if (result.length > 0) {
            let images: Images = []

            for (let entry of result) {
              images.push(new Image(
                new ImageURL(entry.original_url, entry.thumbnail_url),
                entry.alt,
                new Dimension(entry.height, entry.width),
                entry.author_email,
                entry.id
              ))
            }

            resolve(images)
          }
        })
    })
  }

  public getImagesByAuthor(specification: Specification, authorEmail: Email): Promise<Images> {
    return new Promise<Images>((resolve, reject) => {
      let limit = Number(process.env.LIMIT_IMAGES)
      let offset: number = (specification.page - 1) * limit
      let query = `
        SELECT
          BIN_TO_UUID(id) AS id,
          original_url,
          thumbnail_url,
          alt,
          height,
          width
        FROM images
        WHERE alt LIKE ? AND author_email = ?
        ORDER BY images.updated_at DESC
        LIMIT ?, ?
      `

      this._connection.query(
        query,
        [`%${specification.search}%`, authorEmail.string(), offset, limit],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed get images by author'))
          }
          if (result.length > 0) {
            let images: Images = []

            for (let entry of result) {
              images.push(new Image(
                new ImageURL(entry.original_url, entry.thumbnail_url),
                entry.alt,
                new Dimension(entry.height, entry.width),
                authorEmail.string(),
                entry.id
              ))
            }

            resolve(images)
          }
        })
    })
  }

  public getImage(id: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
      this._connection.query(
        "SELECT original_url, thumbnail_url, alt, height, width, author_email FROM images WHERE BIN_TO_UUID(id) = ? LIMIT 1",
        [id],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed get an image'))
          }
          if (result.length > 0) {
            resolve(new Image(
              new ImageURL(result[0].original_url, result[0].thumbnail_url),
              result[0].alt,
              new Dimension(result[0].height, result[0].width),
              result[0].author_email,
              id
            ))
          }

          reject(new Error('image not found'))
        })
    })
  }

  public saveImage(image: Image): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "INSERT INTO images (id, original_url, thumbnail_url, alt, height, width, author_email) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)",
        [
          image.id,
          image.url.original,
          image.url.thumbnail,
          image.alt,
          image.dimension.height,
          image.dimension.width,
          image.authorEmail
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed save an image'))
          }
          
          resolve(result)
        }
      );
    })
  }

  public updateImageAlt(newAlt: string, id: string, authorEmail: Email): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE images SET alt = ? WHERE BIN_TO_UUID(id) = ? AND author_email = ?",
        [
          newAlt,
          id,
          authorEmail.string()
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed update an image alt'))
          }

          resolve(result)
        }
      )
    })
  }

  public updateImageAltWithoutAuthorEmail(newAlt: string, id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE images SET alt = ? WHERE BIN_TO_UUID(id) = ?",
        [
          newAlt,
          id,
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed update an image alt'))
          }

          resolve(result)
        }
      )
    })
  }

  public deleteImage(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query("DELETE FROM images WHERE BIN_TO_UUID(id) = ?",
        [id],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed delete an image'))
          }

          resolve(result)
        })
    })
  }
}
