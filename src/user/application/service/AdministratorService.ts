import UserRepository from "../../domain/repository/UserRepository";
import Administrator from "../../domain/entity/Administrator";
import Name from "../../domain/valueobject/Name";
import Email from "../../domain/valueobject/Email";
import Author from "../../domain/entity/Author";
import ConfirmationService from "./ConfirmationService";

export default class AdministratorService {
  private _userRepository: UserRepository
  private _confirmationService: ConfirmationService

  constructor(userRepository: UserRepository, confirmationService: ConfirmationService) {
    this._userRepository = userRepository;
    this._confirmationService = confirmationService;
  }

  public addAuthor(administrator: Administrator, email: Email, name: Name): Promise<Author> {
    return new Promise<Author>((async (resolve, reject) => {
      let author = administrator.addAuthor(email, name)

      try {
        await this._confirmationService.sendConfirmation(author)
        await this._userRepository.saveAuthor(author)

        resolve(author)
      } catch (err) {
        reject(err)
      }
    }))
  }
}