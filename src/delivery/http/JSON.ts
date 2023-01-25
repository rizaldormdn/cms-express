import Category from "../../entity/Category";

export default class OutputJSON {
  public static category = (category: Category) => {
    return {
      name: category.name,
      id: category.id,
    }
  }
}