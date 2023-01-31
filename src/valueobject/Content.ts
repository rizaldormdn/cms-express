export default class Content {
  private _title: string;
  private _content: string;
  private _excerpt: string;

  constructor(title: string, content: string, excerpt: string) {
    if (title === "" || content === "" || excerpt === "") {
      throw new Error("this part can not be empty");
    }

    this._title = title;
    this._content = content;
    this._excerpt = excerpt;
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
