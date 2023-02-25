import User from "../../domain/entity/User";

export type UserJSON = {
  email: string;
  name: string;
}

export default class UserMapper {
  private _user: User

  constructor(user: User) {
    this._user = user;
  }

  public toJSON(): UserJSON {
    return {
      email: this._user.email.string(),
      name: this._user.name.full()
    }
  }
}