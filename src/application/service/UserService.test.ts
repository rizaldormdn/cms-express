import UserRepository from "../../domain/repository/UserRepository";
import UserService from "./UserService";
import { user, name, password } from "../../testdata";

describe("user service", () => {
  let userRepository: UserRepository = {
    getUser: jest.fn(),
    getUserByToken: jest.fn(),
    saveAuthor: jest.fn(),
    updateUser: jest.fn(),
    deleteAuthor: jest.fn()
  };
  let userService = new UserService(userRepository)

  describe("change name", () => {
    it("should change name", async () => {
      userRepository.updateUser = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
    
      try {
        await userService.changeName(user, name)
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should throw an error if failed change name", async () => {
      userRepository.updateUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))
  
      try {
        await userService.changeName(user, name)
      } catch(err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe("update password", () => {
    it("should update password", async () => {
      userRepository.updateUser = jest.fn().mockResolvedValueOnce(() => Promise.resolve())
  
      try {
        await userService.updatePassword(user, password)
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should throw an error if failed update password", async () => {
      userRepository.updateUser = jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error()))
  
      try {
        await userService.updatePassword(user, password)
      } catch(err) {
        expect(err).toBeDefined()
      }
    })
  })
})