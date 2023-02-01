import Image  from '../entity/Article'


type Images=Image[]

export interface ImageRepository{
    getImage(uuid: string):Promise<Image>
    getImages(uuid: string):Promise<Images>
    saveImage(image:Image):Promise<void>
    updateImage(image:Image):Promise<void>
    deleteImage(uuid: string):Promise<void>
}