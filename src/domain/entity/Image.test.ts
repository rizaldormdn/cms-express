import Image from "./Image";
import Dimension from "../valueobject/Dimension";
import ImageURL from "../valueobject/ImageURL";

describe("Image", () => {
  let url = new ImageURL("http://example.com/original.jpg", "http://example.com/thumbnail.jpg")
  let alt = "Example image"
  let dimension = new Dimension(740, 360)
  let image: Image = new Image(url, alt, dimension);

  it("should have a unique id", () => {
    expect(image.id).toBeDefined();
    expect(typeof image.id).toBe("string");
  });

  it("should have url", () => {
    expect(image.url).toBe(url)
  })

  it("should have the correct alt text", () => {
    expect(image.alt).toBe(alt);
    expect(() => new Image(url, "", dimension)).toThrowError();
  });

  it("should have the correct dimension", () => {
    expect(image.dimension).toEqual(dimension);
  });
});