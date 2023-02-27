import { Images } from "../../domain/entity/Image";

export type ImageJSON = {
  id: string;
  url: {
    original: string;
    thumbnail: string;
  }
  alt: string;
  dimension: {
    height: number;
    width: number;
  }
  author_email: string;
}

export type ImagesJSON = ImageJSON[]

export default class ImageMapper {
  public static toJSON(images: Images): ImagesJSON {
    let imagesJSON: ImagesJSON = []

    for (let image of images) {
      imagesJSON.push({
        id: image.id,
        url: {
          original: image.url.original,
          thumbnail: image.url.thumbnail
        },
        alt: image.alt,
        dimension: {
          height: image.dimension.height,
          width: image.dimension.width
        },
        author_email: image.authorEmail
      })
    }

    return imagesJSON
  }
}