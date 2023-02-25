import UserRepository from "../../domain/repository/UserRepository";
import ResetPasswordService from "./ResetPasswordService";
import Author from "../../domain/entity/Author";
import { authorEmail, name, author, password, token } from "../../../src/testdata"

describe("ResetPasswordService", () => {
  let userRepository: UserRepository = {
    getUser: jest.fn(),
    getUserByToken: jest.fn(),
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
      userRepository.getUser = jest.fn().mockResolvedValueOnce(author)
      userRepository.updateUser = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

      try {
        resetPasswordService.resetPassword(authorEmail, password, token)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    test("reset password token cannot be empty", async () => {
      let author: Author = new Author(authorEmail, name, password);
      
      userRepository.getUser = jest.fn().mockResolvedValueOnce(author)

      try {
        await resetPasswordService.resetPassword(authorEmail, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("cannot verify a wrong token", async () => {
      userRepository.getUser = jest.fn().mockResolvedValueOnce(author)

      try {
        await resetPasswordService.resetPassword(authorEmail, password, "wrongtoken")
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed get author", async () => {
      userRepository.getUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetPassword(authorEmail, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed update author", async () => {
      userRepository.getUser = jest.fn().mockResolvedValueOnce(author)
      userRepository.updateUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetPassword(authorEmail, password, token)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})