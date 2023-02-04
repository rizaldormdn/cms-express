export default class ArticleDate {
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor(createdAt?: Date, updatedAt?: Date) {
		this._createdAt = createdAt || new Date();
		this._updatedAt = updatedAt || new Date();
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}

	public update(): void {
		this._updatedAt = new Date();
	}
}
