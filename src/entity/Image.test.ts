import Image from "./Image";
import { describe, beforeEach, it, expect } from '@jest/globals';

describe("Image", () => {
let image: Image;
const url = "https://example.com/image.jpg";
const alt = "Example image";
const dimension = ""
const thumbnails = ""

beforeEach(() => {
image = new Image(url, alt, dimension, thumbnails);
});

it("should have a unique id", () => {
expect(image.id).toBeDefined();
expect(typeof image.id).toBe("string");
});

it("should have the correct url", () => {
expect(image.url).toBe(url);
});

it("should have the correct alt text", () => {
expect(image.alt).toBe(alt);
});

it("should have the correct dimension", () => {
expect(image.dimension).toEqual(dimension);
});

it("should have the correct thumbnails", () => {
expect(image.thumbnails).toEqual(thumbnails);
});
});