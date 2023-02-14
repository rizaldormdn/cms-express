import { Connection } from "mysql2";
import Author from "../../../domain/entity/Author";
import Image, { Images } from "../../../domain/entity/Image";
import * as ImageRepositoryInterface from "../../../domain/repository/ImageRepository"

export default class ImageRepository implements ImageRepositoryInterface.default {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  getImages(author: Author): Promise<Images> {
    return new Promise<Images>(() => {})
  }

  getImage(uuid: string): Promise<Image> {
    return new Promise<Image>(() => {})
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
    return new Promise<void>(() => {})
  }

  deleteImage(uuid: string): Promise<void> {
    return new Promise<void>(() => {})
  }
}
