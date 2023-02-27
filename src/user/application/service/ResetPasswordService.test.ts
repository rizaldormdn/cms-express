import UserRepository from "../../domain/repository/UserRepository";
import ResetPasswordService from "./ResetPasswordService";
import Author from "../../domain/entity/Author";
import { authorEmail, name, author, password, token, invalidResetPasswordToken } from "../../../testdata"

describe("ResetPasswordService", () => {
  let userRepository: UserRepository = {
    getAuthors: jest.fn(),
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
      userRepository.getUserByToken = jest.fn().mockResolvedValueOnce(author)
      userRepository.updateUser = jest.fn().mockResolvedValueOnce(() => Promise.resolve())

      try {
        resetPasswordService.resetPassword(token, password)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    test("reset password token is invalid", async () => {
      let author: Author = new Author(authorEmail, name, password, invalidResetPasswordToken);
      
      userRepository.getUserByToken = jest.fn().mockResolvedValueOnce(author)

      try {
        await resetPasswordService.resetPassword(token, password)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("cannot verify a wrong token", async () => {
      userRepository.getUserByToken = jest.fn().mockResolvedValueOnce(author)

      try {
        await resetPasswordService.resetPassword("wrongtoken", password)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed get author", async () => {
      userRepository.getUserByToken = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetPassword(token, password)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test("failed update author", async () => {
      userRepository.getUserByToken = jest.fn().mockResolvedValueOnce(author)
      userRepository.updateUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))

      try {
        await resetPasswordService.resetPassword(token, password)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})