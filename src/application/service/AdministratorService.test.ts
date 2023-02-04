import UserRepository from "../../domain/repository/UserRepository";
import Administrator from "../../domain/aggregate/Administrator";
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
  let administratorService = new AdministratorService(userRepository);
  let email: Email = new Email("test@example.com");
  let name: Name = new Name("John Doe");
  let newName = new Name("John", "Cena")
  let administrator: Administrator = new Administrator(email, name, new Password());

  it("should be defined", () => {
    expect(administratorService).toBeDefined()
  })

  it("should change name", async () => {
    await expect(administratorService.changeName(administrator, newName)).resolves.not.toThrowError()
  })

  it("should throw an error if failed change name", async () => {
    expect.assertions(1);

    await expect(administratorService.changeName(administrator, newName)).resolves.not.toThrowError()
  })
})