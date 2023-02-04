import Administrator from "../../domain/aggregate/Administrator";
import UserRepository from "../../domain/repository/UserRepository";
import Name from "../../domain/valueobject/Name";

export default class AdministratorService {
  private _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public changeName(administrator: Administrator, name: Name): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      administrator.changeName(name)
    
      try {
        resolve(await this._userRepository.updateAdministrator(administrator))
      } catch (err) {
        reject(err)
      }
    })
  }
}