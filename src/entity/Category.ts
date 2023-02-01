import { v4 as uuidv4 } from "uuid";
/* since the class is not exist, i create type object fist
	after that i can easily change it into the right class

	import Article from "./Article";
*/

type Article = {
  slug: string;
  content: {
    title: string;
    excerpt: string;
    content: string;
  };
  author: string;
  category: Category;
  image: string;
  isPublished: boolean;
  date: {
    createdAt: Date;
    updatedAt: Date;
  };
};

/* the type object above is only for example purposes
	until class of Article merged to master
*/

export default class Category {
  private _id: string;
  private _name: string;
  private _articles: Article[] = [];

  constructor(name: string) {
    if (name === "") throw new Error("name cannot be empty");
    this._id = uuidv4();
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  addArticle(article: Article): void {
    this._articles.push(article);
  }

  get articles(): Article[] {
    return this._articles;
  }
}
