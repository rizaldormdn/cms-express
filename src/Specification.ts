export default class Specification {
  private _search: string
  private _page: number

  constructor(search: string, page: number) {
    this._search = search
    this._page = page
  }

  public get search(): string {
    return this._search
  }

  public get page(): number {
    return this._page
  }
}