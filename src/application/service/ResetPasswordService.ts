import UserRepository from "../../domain/repository/UserRepository";
import Password from "../../domain/valueobject/Password";
import User from "../../domain/entity/User";

export default class ResetPasswordService {
  private _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public resetPassword(token: string, newPassword: Password): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let user: User = await this._userRepository.getUserByToken(token)

        if (!user.resetPasswordToken!.isValid()) {
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