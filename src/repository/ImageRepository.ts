import Image  from '../entity/Article'

export interface ImageRepository{
    getImage(uuid: string):Promise<Image>
    saveImage(image:Image):Promise<void>
    updateImage(image:Image):Promise<void>
    deleteImage(uuid: string):Promise<void>
}