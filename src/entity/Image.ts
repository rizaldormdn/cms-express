import { uuid } from "uuidv4";
import Thumbnail from "./Thumbnail";
import Dimension from "../valueobject/Dimension"

export default class Image {
	private _id: string;
	private _url: string;
	private _alt: string;
	private _dimension: Dimension;
	private _thumbnails: Thumbnail;

	constructor(url: string, alt: string, dimension: Dimension, thumbnails: Thumbnail) {
		if(url === "") {
			throw new Error("Url cannot be empty");
		}
		if(alt === "") {
			throw new Error("Alt cannot be empty");
		}
		if(dimension === "") {
			throw new Error("Dimension cannot be empty");
		}
		this._url = url;
		this._alt = alt;
		this._dimension = dimension;
		this._id = uuid();
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

    get dimension(): Dimension{
        return this._dimension;
    }

    get thumbnails(): Thumbnail{
        return this._thumbnails;
    }
}

