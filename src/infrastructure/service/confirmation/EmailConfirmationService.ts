import { Transporter, SendMailOptions } from "nodemailer";
import ConfirmationService from "../../../application/service/ConfirmationService";
import Author from "../../../domain/entity/Author";
import ResetPasswordToken from "../../../domain/valueobject/ResetPasswordToken";
import UserRepository from "../../../domain/repository/UserRepository";

export default class EmailConfirmationService implements ConfirmationService {
  private _transporter: Transporter
  private _sendMailOptions: SendMailOptions
  private _userRepository: UserRepository;

  constructor(transporter: Transporter, sendMailOptions: SendMailOptions, userRepository: UserRepository) {
    this._transporter = transporter
    this._sendMailOptions = sendMailOptions
    this._userRepository = userRepository
  }

  public sendConfirmation(author: Author): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      author.addResetPasswordToken(new ResetPasswordToken())

      this._sendMailOptions.to = author.email.string()
      this._sendMailOptions.subject = process.env.EMAIL_CONFIRMATION_SUBJECT
      this._sendMailOptions.html = `<p>Please visit <a href="${process.env.RESET_PASSWORD_URL}?token=${author.resetPasswordToken!.token}" target="_blank">this link</a> to reset your password!</p>`

      try {
        await this._userRepository.saveAuthor(author)
        this._transporter.sendMail(this._sendMailOptions, (err, info) => {
          if (err) {
            console.error(err);
  
            reject(err)
          }
  
          console.log(info)
  
          resolve(info)
        })
      } catch (err) {
        console.error(err)

        reject(err)
      }
    })
  }
}