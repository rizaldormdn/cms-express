import Author from "../../domain/entity/Author";

export default interface ConfirmationService {
  sendConfirmation(author: Author): Promise<void>
}