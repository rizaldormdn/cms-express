import { v4 as uuidv4 } from "uuid";
import Category from "../entity/Category";
import Dimension from "../valueobject/Dimension";


export default class ThumbnailCategory {
    public _id: string;
    public _name: string;
    public _dimension: Dimension;


    constructor(name:string, dimension:Dimension) {
        if (name === "") {
            throw new Error("Name Is Require")
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