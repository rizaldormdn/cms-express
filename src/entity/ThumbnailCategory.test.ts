import ThumbnailCategory from "./ThumbnailCategory";
import Dimension from "../valueobject/Dimension";

describe("ThumbnailCategory", () => {
    it("Throw Error When Name Is Empty", () => {
        expect( () => {
            new ThumbnailCategory("", new Dimension(100,100)) 
        }).toThrowError("Name Is Required")
    })
})