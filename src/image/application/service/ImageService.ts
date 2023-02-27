require("dotenv").config();

import fs from "fs";
import path from "path";
import User from "../../../user/domain/entity/User";
import Image from "../../domain/entity/Image";
import ImageRepository from "../../domain/repository/ImageRepository";

export default class ImageService {
  private _imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository) {
    this._imageRepository = imageRepository;
  }

  public updateImage(user: User, imageID: string, newAlt: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let image: Image = await this._imageRepository.getImage(imageID)

        if (!user.isAdministrator && user.email.string() !== image.authorEmail) {
          reject(new Error('permission denied'))
        }

        image.updateAlt(newAlt)

        resolve(await this._imageRepository.updateImage(image))
      } catch (err) {
        reject(err);
      }
    })
  }

  public deleteImage(user: User, imageID: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let image: Image = await this._imageRepository.getImage(imageID)

        if (!user.isAdministrator && user.email.string() !== image.authorEmail) {
          reject(new Error('permission denied'))
        }

        let directory = path.join(__dirname, '../../../../public')
        let url = process.env.BASE_URL + '/static'

        fs.unlinkSync(directory + image.url.original.replace(url, ''))
        fs.unlinkSync(directory + image.url.thumbnail.replace(url, ''))

        resolve(await this._imageRepository.deleteImage(imageID))
      } catch(err) {
        reject(err)
      }
    })
  }
}