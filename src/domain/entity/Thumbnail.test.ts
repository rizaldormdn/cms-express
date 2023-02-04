import Thumbnail from "./Thumbnail";
import ThumbnailCategory from "../entity/ThumbnailCategory";
import Dimension from "../valueobject/Dimension";

describe("Thumbnail", () => {
  let url = "https://example.com/thumbnail.jpg"
  let dimension = new Dimension(1200, 630)
  let thumbnailCategory = new ThumbnailCategory("Open Graph", dimension);
  let thumbnail = new Thumbnail(url, thumbnailCategory);

  it("should have correct id", () => {
    expect(thumbnail.id).toBeDefined();
    expect(typeof thumbnail.id).toBe("string");
  });

  it("should have correct url", () => {
    expect(thumbnail.url).toBe(url);
    expect(() => new Thumbnail("", thumbnailCategory)).toThrowError()
  });

  it("should have correct category", () => {
    expect(thumbnail.category).toBe(thumbnailCategory);
  });
});


