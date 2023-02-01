import { v4 as uuidv4 } from "uuid";
import ThumbnailCategory from "../entity/ThumbnailCategory";

export default class Thumbnail {
  private _id: string;
  private _url: string;
  private _category: ThumbnailCategory;

  constructor(url: string, category: ThumbnailCategory) {
    if (url === "") {
      throw new Error("url cannot be empty")
    }

    this._id = uuidv4();
    this._url = url;
    this._category = category;
  }

  public get id(): string {
    return this._id;
  }

  public get url(): string {
    return this._url;
  }

  public get category(): ThumbnailCategory {
    return this._category;
  }
}
