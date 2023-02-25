import UserRepository from "../../domain/repository/UserRepository";
import Password from "../../domain/valueobject/Password";
import Email from "../../domain/valueobject/Email";
import User from "../../domain/entity/User";

export default class ResetPasswordService {
  private _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public resetPassword(email: Email, newPassword: Password, token: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let user: User = await this._userRepository.getUser(email)

        if (!user.resetPasswordToken) {
          reject(new Error("reset password token cannot be empty"));
  
          return
        }
        if (!user.resetPasswordToken.isValid()) {
          reject(new Error("token is not valid"));
  
          return
        }
  
        user.updatePassword(newPassword);

        await this._userRepository.updateUser(user);

        resolve()
      } catch (err) {
        console.error(err)

        reject(err)
      }
    })
  }
}