import Content from "./Content";

type content = {
  title: string
  content: string
  excerpt: string
}

describe("content value object", () => {
  let content: Content = new Content("Jalan-jalan", "ke pantai", "Liburan");

  test('title of "Jalan-jalan" should be "Jalan-jalan"', () => {
    expect(content.title).toBe("Jalan-jalan");
  });

  test('content of "ke pantai" should be "ke pantai"', () => {
    expect(content.content).toBe("ke pantai");
  });

  test('excerpt of "Liburan" should be "Liburan"', () => {
    expect(content.excerpt).toBe("Liburan");
  });

  test('title, content, and excerpt are required', () => {
    let invalidContents: content[] = [
      {
        title: '',
        content: 'This is content.',
        excerpt: 'This is excerpt.'
      },
      {
        title: 'This is title',
        content: '',
        excerpt: 'This is excerpt.'
      },
      {
        title: 'This is title',
        content: 'This is content.',
        excerpt: ''
      },
    ]

    for (let invalidContent of invalidContents) {
      expect(() => new Content(
        invalidContent.title,
        invalidContent.content,
        invalidContent.excerpt
      )).toThrowError()
    }
  })
});
