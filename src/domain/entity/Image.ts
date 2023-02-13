import { v4 as uuidv4 } from "uuid";
import Dimension from "../valueobject/Dimension"
import ImageURL from "../valueobject/ImageURL";

export default class Image {
	private _id: string;
	private _url: ImageURL;
	private _alt: string;
	private _dimension: Dimension;

	constructor(url: ImageURL, alt: string, dimension: Dimension) {
		if (alt === "") {
			throw new Error("alt cannot be empty");
		}

		this._id = uuidv4();
		this._url = url;
		this._alt = alt;
		this._dimension = dimension;
	}

	get id(): string {
		return this._id;
	}

	get url(): ImageURL {
		return this._url;
	}

  get alt(): string {
		return this._alt;
	}

	get dimension(): Dimension {
		return this._dimension;
	}
}

export type Images = Image[]