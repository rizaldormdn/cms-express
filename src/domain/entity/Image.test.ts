import { image, imageURL, dimension, alt, email } from "../../testdata"
import Image from "./Image";

describe("Image", () => {
  it("should have a unique id", () => {
    let image = new Image(imageURL, alt, dimension, email.string())

    expect(image.id).toBeDefined();
    expect(typeof image.id).toBe("string");
  });

  it("should have a defined id", () => {
    let id = "abc123"
    let image = new Image(imageURL, alt, dimension, email.string(), id)

    expect(image.id).toBe(id)
  })

  it("should have url", () => {
    expect(image.url).toBe(imageURL)
  })

  it("should have the correct alt text", () => {
    expect(image.alt).toBe(alt);
    expect(() => new Image(imageURL, "", dimension, email.string())).toThrowError();
  });

  it("should have the correct dimension", () => {
    expect(image.dimension).toEqual(dimension);
  });

  it("should have the author email", () => {
    expect(image.authorEmail).toBe(email.string());
    expect(() => new Image(imageURL, alt, dimension, "")).toThrowError();
  })
});