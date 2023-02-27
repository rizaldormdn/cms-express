import { Connection } from "mysql2";
import Image, { Images } from "../../../domain/entity/Image";
import * as ImageRepositoryInterface from "../../../domain/repository/ImageRepository"
import Dimension from "../../../domain/valueobject/Dimension";
import ImageURL from "../../../domain/valueobject/ImageURL";
import Author from "../../../../user/domain/entity/Author";

export default class ImageRepository implements ImageRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public getImages(author: Author): Promise<Images> {
    return new Promise<Images>((resolve, reject) => {
      this._connection.query(
        "SELECT BIN_TO_UUID(id), original_url, thumbnail_url, alt, height, width FROM images WHERE author_email = ? LIMIT ?",
        [
          author.email.string(),
          Number(process.env.LIMIT_IMAGES)
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed get images'))
          }
          if (result.length > 0) {
            let images: Images = []

            for (let entry of result) {
              images.push(new Image(
                new ImageURL(entry.original, entry.thumbnail),
                entry.alt,
                new Dimension(entry.height, entry.width),
                author.email.string(),
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

  public updateImage(image: Image): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "UPDATE images SET original_url = ?, thumbnail_url = ?, alt = ?, height = ?, width = ? WHERE BIN_TO_UUID(id) = ?",
        [
          image.url.original,
          image.url.thumbnail,
          image.alt,
          image.dimension.height,
          image.dimension.width,
          image.id
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(new Error('failed update an image'))
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
