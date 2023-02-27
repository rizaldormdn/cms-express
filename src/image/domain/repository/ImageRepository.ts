import Image, { Images } from "../entity/Image"
import Specification from "../../../Specification"
import Email from "../../../user/domain/valueobject/Email"

export default interface ImageRepository{
  countImages(specification: Specification): Promise<number>
  countImagesByAuthor(specification: Specification, authorEmail: Email): Promise<number>
  getImages(specification: Specification): Promise<Images>
  getImagesByAuthor(specification: Specification, authorEmail: Email): Promise<Images>
  getImage(id: string): Promise<Image>
  saveImage(image: Image): Promise<void>
  updateImage(image: Image): Promise<void>
  deleteImage(id: string): Promise<void>
}