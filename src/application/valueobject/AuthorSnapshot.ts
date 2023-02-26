export default class AuthorSnapshot {
  private _name: string
  private _email: string

  constructor(name: string, email: string) {
    this._name = name
    this._email = email
  }

  public get name(): string {
    return this._name
  }

  public get email(): string {
    return this._email
  }
}

export type AuthorSnapshots = AuthorSnapshot[]