import bcrypt from "bcrypt";

export default class Password {
  private _salt: string;
  private _hashedPassword: string;

  constructor(salt: string = "", hash: string = "") {
    this._salt = salt;
    if (this._salt === "") {
      this._salt = bcrypt.genSaltSync();
    }
    this._hashedPassword = hash;
  }

  public hash(password: string) {
    this._hashedPassword = bcrypt.hashSync(password, this._salt);
  }

  public verify(password: string): boolean {
    return bcrypt.compareSync(password, this._hashedPassword);
  }
}
