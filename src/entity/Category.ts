import { v4 as uuidv4 } from "uuid";

export default class Category {
	private _id: string;
	private _name: string;

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
}
