import { uuid } from "uuidv4"
type ImageMeta={
    size: number
}
type Dimension={
    size: number
}
type Thumbnails={
    size: number
}

export default class Image {
	private _id: string;
	private _url: string;
	private _alt: string;
	private _meta: ImageMeta;
	private _dimension: Dimension;
	private _thumbnails: Thumbnails;



	constructor(url: string, alt: string, meta: ImageMeta, dimension: Dimension, thumbnails: Thumbnails) {
		this._id = uuid();
		this._url = url;
		this._alt = alt;
		this._meta = meta;
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

    get meta(): ImageMeta{
        return this._meta;
    }

    get dimension(): Dimension{
        return this._dimension;
    }

    get thumbnails(): Thumbnails{
        return this._thumbnails;
    }
}

