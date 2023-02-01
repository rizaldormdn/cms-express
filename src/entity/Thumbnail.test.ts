import Thumbnail from "./Thumbnail";
import ThumbnailCategory from "../entity/ThumbnailCategory";
import Image from "../entity/Image";

describe("Thumbnail", () => {
  let thumbnail: Thumbnail;
  const url = "https://example.com/thumbnail.jpg";
  const category = new ThumbnailCategory("Category 1");
  const belongToImage = new Image("https://example.com/image.jpg");

  beforeEach(() => {
    thumbnail = new Thumbnail(url, category, belongToImage);
  });

  it("should have correct id", () => {
    expect(thumbnail.id).toBeDefined();
    expect(typeof thumbnail.id).toBe("string");
  });

  it("should have correct url", () => {
    expect(thumbnail.url).toBe(url);
  });

  it("should have correct category", () => {
    expect(thumbnail.category).toBe(category);
  });

  it("should have correct belongToImage", () => {
    expect(thumbnail.belongToImage).toBe(belongToImage);
  });
});


