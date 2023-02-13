import UserRepository from "../../domain/repository/UserRepository";
import Administrator from "../../domain/entity/Administrator";
import Name from "../../domain/valueobject/Name";
import AdministratorService from "./AdministratorService"
import Password from "../../domain/valueobject/Password";
import Email from "../../domain/valueobject/Email";

describe("Administrator service", () => {
  let userRepository: UserRepository = {
    getAdministrator: jest.fn(),
    getAuthor: jest.fn(),
    saveAuthor: jest.fn(),
    updateAdministrator: jest.fn(),
    updateAuthor: jest.fn(),
    deleteAuthor: jest.fn()
  };
  let administratorService = new AdministratorService(userRepository)

  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John Doe");
  let newName = new Name("John", "Cena")
  let administrator: Administrator = new Administrator(email, name, new Password());

  it("should be defined", () => {
    expect(administratorService).toBeDefined()
  })

  it("should change name", async () => {
    userRepository.updateAdministrator = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
  
    try {
      await administratorService.changeName(administrator, newName)
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("should throw an error if failed change name", async () => {
    userRepository.updateAdministrator = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

    try {
      await administratorService.changeName(administrator, newName)
    } catch(err) {
      expect(err).toBeDefined()
    }
  })

  it("should update password", async () => {
    userRepository.updateAdministrator = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

    try {
      await administratorService.updatePassword(administrator, new Password())
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("should throw an error if failed update password", async () => {
    userRepository.updateAdministrator = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

    try {
      await administratorService.updatePassword(administrator, new Password())
    } catch(err) {
      expect(err).toBeDefined()
    }
  })

  it("should add an author", async () => {
    userRepository.saveAuthor = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
    
    let email = new Email("author@example.com");
    let name = new Name("John", "Cena")

    try {
      let author = await administratorService.addAuthor(administrator, email, name)

      expect(author).toBeDefined()
    } catch(err) {
      expect(err).toBeUndefined()
    }
  })

  it("should throw an error if failed add an author", async () => {
    userRepository.saveAuthor = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))
    
    let email = new Email("author@example.com");
    let name = new Name("John", "Cena")

    try {
      let author = await administratorService.addAuthor(administrator, email, name)

      expect(author).toBeUndefined()
    } catch(err) {
      expect(err).toBeDefined()
    }
  })
})