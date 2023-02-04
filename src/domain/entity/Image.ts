import { v4 as uuidv4 } from "uuid";
import { Thumbnails } from "./Thumbnail";
import Dimension from "../valueobject/Dimension"

export default class Image {
	private _id: string;
	private _url: string;
	private _alt: string;
	private _dimension: Dimension;
	private _thumbnails: Thumbnails;

	constructor(url: string, alt: string, dimension: Dimension, thumbnails: Thumbnails) {
		if (url === "") {
			throw new Error("url cannot be empty");
		}
		if (alt === "") {
			throw new Error("alt cannot be empty");
		}

		this._id = uuidv4();
		this._url = url;
		this._alt = alt;
		this._dimension = dimension;
		this._thumbnails = thumbnails;
	}

	get id(): string {
		return this._id;
	}

	get url(): string {
		return this._url;
	}

  get alt(): string {
		return this._alt;
	}

	get dimension(): Dimension {
		return this._dimension;
	}

	get thumbnails(): Thumbnails {
		return this._thumbnails;
	}
}

export type Images = Image[]