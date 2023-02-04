import { v4 as uuidv4 } from "uuid";
import Article, { Articles } from "./Article";

export default class Category {
  private _id: string;
  private _name: string;
  private _articles: Articles;

  constructor(name: string, articles: Articles) {
    if (name === "") throw new Error("name cannot be empty");

    this._id = uuidv4();
    this._name = name;
    this._articles = articles;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get articles(): Articles {
    return this._articles;
  }

  addArticle(article: Article): void {
    this._articles.push(article);
  }
}
