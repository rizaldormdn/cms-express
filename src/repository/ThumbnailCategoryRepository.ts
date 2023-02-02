import ThumbnailCategory from '../entity/ThumbnailCategory'


type ThumbnailCategories= ThumbnailCategory[]
export interface ThumbnailCategoryRepository{
    getThumbnailCategories():Promise<ThumbnailCategories>
    saveThumbnailCategory(thumbnailCategory:ThumbnailCategory):Promise<void>
    deleteThumbnailCategory(uuid:string):Promise<void>
}