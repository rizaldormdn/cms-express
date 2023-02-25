require("dotenv").config();

import { Transporter, SendMailOptions } from "nodemailer";
import ConfirmationService from "../../../application/service/ConfirmationService";
import Author from "../../../domain/entity/Author";

export default class EmailConfirmationService implements ConfirmationService {
  private _transporter: Transporter
  private _sendMailOptions: SendMailOptions

  constructor(transporter: Transporter, sendMailOptions: SendMailOptions) {
    this._transporter = transporter
    this._sendMailOptions = sendMailOptions
  }

  public sendConfirmation(author: Author): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this._sendMailOptions.to = author.email.string()
      this._sendMailOptions.subject = process.env.EMAIL_CONFIRMATION_SUBJECT
      this._sendMailOptions.html = `<p>Please visit <a href="${process.env.RESET_PASSWORD_URL}?token=${author.resetPasswordToken!.token}" target="_blank">this link</a> to reset your password!</p>`

      try {
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