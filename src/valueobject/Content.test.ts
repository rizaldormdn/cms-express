import Content from "./Content";

describe("content value object", () => {
  let content: Content = new Content("Jalan-alan", "ke pantai", "Liburan");

  test('title of "Jalan-jalan" should be "Jalan-jalan"', () => {
    expect(content.title).toBe("Jalan-jalan");
  });

  test('content of "ke pantai" should be "ke pantai"', () => {
    expect(content.content).toBe("ke pantai");
  });
  test('excerpt of "Liburan" should be "Liburan"', () => {
    expect(content.excerpt).toBe("Liburan");
  });
});
