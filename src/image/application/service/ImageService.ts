import Email from "../../../user/domain/valueobject/Email";
import Image from "../../domain/entity/Image";
import ImageRepository from "../../domain/repository/ImageRepository";

export default class ImageService {
  private _imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository) {
    this._imageRepository = imageRepository;
  }

  public updateImage(authorEmail: Email, imageID: string, newAlt: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let image: Image = await this._imageRepository.getImage(imageID)

        if (authorEmail.string() !== image.authorEmail) {
          reject(new Error('permission denied'))
        }

        image.updateAlt(newAlt)

        resolve(await this._imageRepository.updateImage(image))
      } catch (err) {
        reject(err);
      }
    })
  }
}