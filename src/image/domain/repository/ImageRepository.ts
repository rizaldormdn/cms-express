import Image, { Images } from "../entity/Image"
import Author from '../../../user/domain/entity/Author'

export default interface ImageRepository{
  getImages(author: Author): Promise<Images>
  getImage(id: string): Promise<Image>
  saveImage(image: Image): Promise<void>
  updateImage(image: Image): Promise<void>
  deleteImage(id: string): Promise<void>
}