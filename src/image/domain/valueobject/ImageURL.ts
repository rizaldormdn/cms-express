export default class ImageURL {
  private _original: string;
  private _thumbnail: string;

  constructor(original: string, thumbnail: string) {
    if (original === "" || thumbnail === "") {
      throw new Error("original or thumbnail URL cannot be empty")
    }

    this._original = original;
    this._thumbnail = thumbnail;
  }

  public get original(): string {
    return this._original;
  }

  public get thumbnail(): string {
    return this._thumbnail;
  }
}