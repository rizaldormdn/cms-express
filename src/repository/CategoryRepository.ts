import Category from "../entity/Category";

export interface CategoryRepository {
  getCategory(uuid: string): Promise<Category>
  saveCategory(category: Category): Promise<void>
  updateCategory?(category: Category): Promise<void>
  deleteCategory?(uuid: string): Promise<void>
}