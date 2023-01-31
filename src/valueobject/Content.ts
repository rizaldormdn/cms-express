export default class Content {
  private _title: string;
  private _content: string;
  private _excerpt: string;

  constructor(title: string, content: string, excerpt: string) {
    this._title = title;
    if (title === "") {
      throw new Error("title cannot be empty");
    }
    this._content = content;
    if (content === "") {
      throw new Error("content cannot be empty");
    }
    this._excerpt = excerpt;
    if (excerpt === "") {
      throw new Error("excerpt cannot be empty");
    }
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get excerpt(): string {
    return this._excerpt;
  }
}
