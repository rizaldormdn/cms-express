import Image, { Images } from "../entity/Image"
import Author from '../aggregate/Author'

export interface ImageRepository{
  getImages(author: Author): Promise<Images>
  getImage(uuid: string): Promise<Image>
  saveImage(image: Image): Promise<void>
  updateImage(image: Image): Promise<void>
  deleteImage(uuid: string): Promise<void>
}