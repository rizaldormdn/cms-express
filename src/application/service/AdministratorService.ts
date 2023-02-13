import UserRepository from "../../domain/repository/UserRepository";
import Administrator from "../../domain/entity/Administrator";
import Name from "../../domain/valueobject/Name";
import Password from "../../domain/valueobject/Password";
import Email from "../../domain/valueobject/Email";
import Author from "../../domain/entity/Author";

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

  public updatePassword(administrator: Administrator, password: Password): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      administrator.updatePassword(password)

      try {
        resolve(await this._userRepository.updateAdministrator(administrator))
      } catch (err) {
        reject(err)
      }
    })
  }

  public addAuthor(administrator: Administrator, email: Email, name: Name): Promise<Author> {
    return new Promise<Author>((async (resolve, reject) => {
      let author = administrator.addAuthor(email, name)

      try {
        await this._userRepository.saveAuthor(author)

        resolve(author)
      } catch (err) {
        reject(err)
      }
    }))
  }
}