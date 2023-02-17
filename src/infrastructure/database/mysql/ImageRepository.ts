import { Connection } from "mysql2";
import Author from "../../../domain/entity/Author";
import Image, { Images } from "../../../domain/entity/Image";
import * as ImageRepositoryInterface from "../../../domain/repository/ImageRepository"
import Dimension from "../../../domain/valueobject/Dimension";
import ImageURL from "../../../domain/valueobject/ImageURL";

export default class ImageRepository implements ImageRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  getImages(): Promise<Images> {
    return new Promise<Images>((resolve, reject) => {
      this._connection.query(
        "SELECT id, original_url, thumbnail_url, alt, height, width FROM images LIMIT ?",
        [Number(process.env.LIMIT_IMAGES)],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(err)
          }
          if (result.length > 0) {
            resolve(result.map((image: any) => {
              new Image(
                new ImageURL(image.original, image.thumbnail),
                image.alt,
                new Dimension(image.height, image.width),
                image.id
              )
            }))
          }
        })
    })
  }

  getImage(id: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
      this._connection.query(
        "SELECT original_url, thumbnail_url, alt, height, width FROM images WHERE BIN_TO_UUID(id) = ? LIMIT 1",
        [id],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(err)
          }
          if (result.length > 0) {
            resolve(new Image(
              new ImageURL(result[0].original, result[0].thumbnail),
              result[0].alt,
              new Dimension(result[0].height, result[0].width),
              id
            ))
          }
        })
    })
  }

  saveImage(image: Image): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query(
        "INSERT INTO images (id, original_url, thumbnail_url, alt, height, width) VALUES (?, ?, ?, ?, ?, ?)",
        [
          image.id,
          image.url.original,
          image.url.thumbnail,
          image.alt,
          image.dimension.height,
          image.dimension.width,
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(err)
          }
          
          resolve(result)
        }
      );
    })
  }

  updateImage(image: Image): Promise<void> {
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

            reject(err)
          }

          resolve(result)
        }
      )
    })
  }

  deleteImage(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query("DELETE FROM images WHERE BIN_TO_UUID(id) = ?",
        [id],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err)

            reject(err)
          }

          resolve(result)
        })
    })
  }
}
