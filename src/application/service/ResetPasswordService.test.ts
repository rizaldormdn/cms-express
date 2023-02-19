import UserRepository from "../../domain/repository/UserRepository";
import ResetPasswordService from "./ResetPasswordService";
import Author from "../../domain/entity/Author";
import { email, name, author, password, token } from "../../../src/testdata"

describe("ResetPasswordService", () => {
  let userRepository: UserRepository = {
    getAdministrator: jest.fn(),
    getAuthor: jest.fn(),
    saveAuthor: jest.fn(),
    updateUser: jest.fn(),
    deleteAuthor: jest.fn()
  };
  let resetPasswordService = new ResetPasswordService(userRepository);

  it("should be defined", () => {
    expect(resetPasswordService).toBeDefined()
  })

  describe("it could reset author password", () => {
    test("success", () => {
      userRepository.updateUser = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

      try {
        resetPasswordService.resetPassword(author, password, token)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    test("reset password token cannot be empty", async () => {
      let author: Author = new Author(email, name, password);

      try {
        await resetPasswordService.resetPassword(author, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("cannot verify a wrong token", async () => {
      try {
        await resetPasswordService.resetPassword(author, password, "wrongtoken")
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed update author", async () => {
      userRepository.updateUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetPassword(author, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})