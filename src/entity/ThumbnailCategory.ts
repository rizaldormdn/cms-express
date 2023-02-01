import { v4 as uuidv4 } from "uuid";
import Dimension from "../valueobject/Dimension";

export default class ThumbnailCategory {
    private _id: string;
    private _name: string;
    private _dimension: Dimension;

    constructor(name: string, dimension: Dimension) {
        if (name === "") {
            throw new Error("name cannot be empty")
        }

        this._id = uuidv4();
        this._name = name;
        this._dimension = dimension;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get dimension(): Dimension {
        return this._dimension;
    }
}