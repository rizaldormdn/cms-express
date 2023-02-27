import User from "../../domain/entity/User";
import UserRepository from "../../domain/repository/UserRepository";
import Name from "../../domain/valueobject/Name";
import Password from "../../domain/valueobject/Password";

export default class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public changeName(user: User, name: Name): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      user.changeName(name)
    
      try {
        resolve(await this._userRepository.updateUser(user))
      } catch (err) {
        reject(err)
      }
    })
  }

  public updatePassword(user: User, password: Password): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      user.updatePassword(password)

      try {
        resolve(await this._userRepository.updateUser(user))
      } catch (err) {
        reject(err)
      }
    })
  }
}