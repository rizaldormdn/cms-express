import ImageURL from "./ImageURL";

describe("ImageURL", () => {
  it("should have original and thumbnail URL", () => {
    let imageURL = new ImageURL("http://example.com/original.jpg", "http://example.com/thumbnail.jpg");

    expect(imageURL.original).toBe("http://example.com/original.jpg")
    expect(imageURL.thumbnail).toBe("http://example.com/thumbnail.jpg")
  })

  test("original and thumbnail URL cannot be empty", () => {
    expect(() => new ImageURL("", "")).toThrowError()
  })
})