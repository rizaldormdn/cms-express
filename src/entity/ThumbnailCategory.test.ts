import ThumbnailCategory from "./ThumbnailCategory";
import Dimension from "../valueobject/Dimension";

describe("thumbnail category", () => {
  let dimension: Dimension = new Dimension(100, 100)
  let thumbnailCategory: ThumbnailCategory = new ThumbnailCategory(
    "Profile Picture",
    dimension
  );

  it("should have id", () => {
    expect(thumbnailCategory.id).not.toEqual("")
  })

  it("should have name", () => {
    expect(thumbnailCategory.name).toEqual("Profile Picture")
    expect(() => new ThumbnailCategory("", dimension)).toThrowError("name cannot be empty")
  })

  it("should have dimension", () => {
    expect(thumbnailCategory.dimension).toBe(dimension)
  })
})