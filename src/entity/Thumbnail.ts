import { v4 as uuidv4 } from "uuid";
import ThumbnailCategory from "../entity/ThumbnailCategory";
import Image from "../entity/Image";

export default class Thumbnail {
  public _id: string;
  public _url: string;
  public _category: ThumbnailCategory;
  public _belongToImage: Image;

  constructor(url: string, category: ThumbnailCategory, belongToImage: Image) {
    this._id = uuidv4();
    this._url = url;
    this._category = category;
    this._belongToImage = belongToImage;
  }
  get id(): string {
    return this._id;
  }
  get url(): string {
    return this._url;
  }
  get category(): ThumbnailCategory {
    return this._category;
  }
  get belongToImage(): Image {
    return this._belongToImage;
  }
}
