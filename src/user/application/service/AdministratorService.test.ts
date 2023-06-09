import UserRepository from "../../domain/repository/UserRepository";
import Administrator from "../../domain/entity/Administrator";
import Name from "../../domain/valueobject/Name";
import AdministratorService from "./AdministratorService"
import Password from "../../domain/valueobject/Password";
import Email from "../../domain/valueobject/Email";
import ConfirmationService from "./ConfirmationService";

describe("Administrator service", () => {
  let userRepository: UserRepository = {
    getAuthors: jest.fn(),
    getUser: jest.fn(),
    getUserByToken: jest.fn(),
    saveAuthor: jest.fn(),
    updateUser: jest.fn(),
    deleteAuthor: jest.fn()
  };
  let confirmationService: ConfirmationService = {
    sendConfirmation: jest.fn()
  }
  let administratorService = new AdministratorService(userRepository, confirmationService)

  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John Doe");
  let newName = new Name("John", "Cena")
  let authorEmail = new Email("author@example.com");
  let authorName = new Name("John", "Cena")
  let administrator: Administrator = new Administrator(email, name, new Password());

  it("should be defined", () => {
    expect(administratorService).toBeDefined()
  })

  it("should add an author", async () => {
    userRepository.saveAuthor = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
    confirmationService.sendConfirmation = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

    try {
      let author = await administratorService.addAuthor(administrator, authorEmail, authorName)

      expect(author).toBeDefined()
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("should throw an error if failed save an author", async () => {
    userRepository.saveAuthor = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

    try {
      let author = await administratorService.addAuthor(administrator, authorEmail, authorName)

      expect(author).toBeUndefined()
    } catch(err) {
      expect(err).toBeDefined()
    }
  })

  it("should throw an error if failed send an email confirmation", async () => {
    userRepository.saveAuthor = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
    confirmationService.sendConfirmation = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

    try {
      let author = await administratorService.addAuthor(administrator, authorEmail, authorName)

      expect(author).toBeUndefined()
    } catch(err) {
      expect(err).toBeDefined()
    }
  })
})