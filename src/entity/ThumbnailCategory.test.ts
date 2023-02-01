import ThumbnailCategory from "./ThumbnailCategory";
import Dimension from "../valueobject/Dimension";

describe("thumbnail category", () => {
    let thumbnailCategory: ThumbnailCategory = new ThumbnailCategory(
        "Profile Picture",
        new Dimension(100, 100)
    );

    it("should have id", () => {
        expect(thumbnailCategory.id).not.toEqual("")
    })

    it("should have name", () => {
        expect(thumbnailCategory.name).toEqual("Profile Picture")
        expect(() => {
            new ThumbnailCategory("", new Dimension(100, 100)) 
        }).toThrowError("name cannot be empty")
    })

    it("should have dimension", () => {
        expect(thumbnailCategory.dimension).toBe(new Dimension(100, 100))
    })
})