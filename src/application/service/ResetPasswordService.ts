import UserRepository from "../../domain/repository/UserRepository";
import Password from "../../domain/valueobject/Password";
import Author from "../../domain/entity/Author";
import Administrator from "../../domain/entity/Administrator";

export default class ResetPasswordService {
  private _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public resetAuthorPassword(author: Author, newPassword: Password, token: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!author.resetPasswordToken) {
        reject(new Error("reset password token cannot be empty"));

        return
      }
      if (!author.resetPasswordToken.verify(token)) {
        reject(new Error("token is not valid"));

        return
      }

      author.updatePassword(newPassword);

      try {
        await this._userRepository.updateAuthor(author);

        resolve()
      } catch (err) {
        console.error(err)

        reject(err)
      }
    })
  }

  public resetAdministratorPassword(administrator: Administrator, newPassword: Password, token: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!administrator.resetPasswordToken) {
        reject(new Error("reset password token cannot be empty"));

        return
      }
      if (!administrator.resetPasswordToken.verify(token)) {
        reject(new Error("token is not valid"));

        return
      }

      administrator.updatePassword(newPassword);

      try {
        await this._userRepository.updateAdministrator(administrator);

        resolve()
      } catch (err) {
        console.error(err)

        reject(err)
      }
    })
  }
}