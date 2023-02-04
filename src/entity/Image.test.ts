import Image from "./Image";
import Dimension from "../valueobject/Dimension";
import { Thumbnails } from "./Thumbnail";

describe("Image", () => {
  let url = "https://example.com/image.jpg"
  let alt = "Example image"
  let dimension = new Dimension(740, 360)
  let thumbnails: Thumbnails = []
  let image: Image = new Image(url, alt, dimension, thumbnails);

  it("should have a unique id", () => {
    expect(image.id).toBeDefined();
    expect(typeof image.id).toBe("string");
  });

  it("should have the correct url", () => {
    expect(image.url).toBe(url);
    expect(() => new Image("", alt, dimension, thumbnails)).toThrowError();
  });

  it("should have the correct alt text", () => {
    expect(image.alt).toBe(alt);
    expect(() => new Image(url, "", dimension, thumbnails)).toThrowError();
  });

  it("should have the correct dimension", () => {
    expect(image.dimension).toEqual(dimension);
  });

  it("should have the correct thumbnails", () => {
    expect(image.thumbnails).toEqual(thumbnails);
  });
});