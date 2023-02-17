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
            reject(err)
          } else {
            const images: Images = result.map((id: any) => {
              new Image(
                new ImageURL(id.original, id.thumbnail),
                id.alt,
                new Dimension(id.height, id.width)
              )
            })
            resolve(images)
          }
        })
    })
  }

  getImage(uuid: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
      this._connection.query(
        "SELECT original_url, thumbnail_url, alt, height, width FROM images WHERE id = ?",
        [uuid],
        (err: any | null, result: any) => {
          if (err) reject(err)
          if (result.length > 0) {
            resolve(new Image(
              new ImageURL(result[0].original, result[0].thumbnail),
              result[0].alt,
              new Dimension(result[0].height, result[0].width),
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
          if (err) reject(err);
          if (result.length > 0) {
            resolve(result)
          }
        }
      );
    })
  }

  updateImage(image: Image): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query("UPDATE images SET original_url = ?, thumbnail_url = ?, alt = ?, height = ?, width = ?",
        [
          image.url.original,
          image.url.thumbnail,
          image.alt,
          image.dimension.height,
          image.dimension.width
        ],
        (err: any | null, result: any) => {
          if (err) reject(err)
          resolve(result)
        }
      )
    })
  }

  deleteImage(uuid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._connection.query("DELETE FROM images WHERE id = ?",
        [uuid],
        (err: any | null, result: any) => {
          if (err) reject(err)
          resolve(result)
        })
    })
  }
}
