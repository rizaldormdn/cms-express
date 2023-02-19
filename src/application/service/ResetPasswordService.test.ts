import UserRepository from "../../domain/repository/UserRepository";
import ResetPasswordService from "./ResetPasswordService";
import Author from "../../domain/entity/Author";
import Administrator from "../../domain/entity/Administrator";
import { email, name, author, password, token, administrator } from "../../../test/data/Data"

describe("ResetPasswordService", () => {
  let userRepository: UserRepository = {
    getAdministrator: jest.fn(),
    getAuthor: jest.fn(),
    saveAuthor: jest.fn(),
    updateAdministrator: jest.fn(),
    updateAuthor: jest.fn(),
    deleteAuthor: jest.fn()
  };
  let resetPasswordService = new ResetPasswordService(userRepository);

  it("should be defined", () => {
    expect(resetPasswordService).toBeDefined()
  })

  describe("it could reset author password", () => {
    test("success", () => {
      userRepository.updateAuthor = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

      try {
        resetPasswordService.resetAuthorPassword(author, password, token)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    test("reset password token cannot be empty", async () => {
      let author: Author = new Author(email, name, password);

      try {
        await resetPasswordService.resetAuthorPassword(author, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("cannot verify a wrong token", async () => {
      try {
        await resetPasswordService.resetAuthorPassword(author, password, "wrongtoken")
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed update author", async () => {
      userRepository.updateAuthor = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetAuthorPassword(author, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe("it could reset administrator password", () => {
    test("success", () => {
      userRepository.updateAdministrator = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

      try {
        resetPasswordService.resetAdministratorPassword(administrator, password, token)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    test("reset password token cannot be empty", async () => {
      let administrator: Administrator = new Administrator(email, name, password);

      try {
        await resetPasswordService.resetAdministratorPassword(administrator, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("cannot verify a wrong token", async () => {
      try {
        await resetPasswordService.resetAdministratorPassword(administrator, password, "wrongtoken")
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed update administrator", async () => {
      userRepository.updateAdministrator = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetAdministratorPassword(administrator, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})