import Email from "../../domain/valueobject/Email";

export default interface EmailService {
  sendEmailConfirmation(email: Email): Promise<void>
}