import ThumbnailCategory, { ThumbnailCategories } from '../entity/ThumbnailCategory'

export interface ThumbnailCategoryRepository{
  getThumbnailCategories(): Promise<ThumbnailCategories>
  saveThumbnailCategory(thumbnailCategory: ThumbnailCategory): Promise<void>
  deleteThumbnailCategory(uuid: string): Promise<void>
}