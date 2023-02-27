import { v4 as uuidv4 } from "uuid";
import Dimension from "../valueobject/Dimension"
import ImageURL from "../valueobject/ImageURL";

export default class Image {
	private _id: string;
	private _url: ImageURL;
	private _alt: string;
	private _dimension: Dimension;
	private _authorEmail: string;

	constructor(url: ImageURL, alt: string, dimension: Dimension, authorEmail: string, id?: string) {
		if (alt === "") {
			throw new Error("alt cannot be empty");
		}
		if (authorEmail === "") {
			throw new Error("author email cannot be empty");
		}
		
		this._id = uuidv4();
		this._url = url;
		this._alt = alt;
		this._dimension = dimension;
		this._authorEmail = authorEmail;

		if (id !== undefined && id !== "") {
			this._id = id
		}
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

	public updateAlt(alt: string): void {
		this._alt = alt;
	}

	get dimension(): Dimension {
		return this._dimension;
	}

	get authorEmail(): string {
		return this._authorEmail;
	}
}

export type Images = Image[]