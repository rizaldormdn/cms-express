import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as UserRepositoryInterface from "../../../domain/repository/UserRepository";
import UserRepository from "./UserRepository";
import { email, author, authorWithoutResetPasswordToken } from "../../../testdata"

describe("UserRepository", () => {
  let connection: Connection = mysql.createConnection({host: "localhost"});
  let mock: SinonMock = sinon.mock(connection);
  let userRepository: UserRepositoryInterface.default = new UserRepository(connection);

  describe("get user", () => {
    it("should return an user", async () => {
      mock
        .expects("query")
        .once()
        .withArgs(
          "SELECT first_name, last_name, salt, hashed_password, token, token_expiry, is_administrator FROM users WHERE email = ? LIMIT 1"
        )
        .callsArgWith(
          2,
          null,
          [
            {
              first_name: "Admin",
              last_name: "",
              salt: "$2b$10$z1e0ySIYbA/5FXNzZy.Qge",
              hashed_password: "$2b$10$z1e0ySIYbA/5FXNzZy.Qgefti4GC8YwobSbO81EfD9JTuX/X1J1Xu",
              token: "",
              token_expiry: null,
              is_administrator: true
            },
          ],
          ["first_name", "last_name", "salt", "hashed_password", "token", "token_expiry", "is_administrator"]
        );
  
      try {
        expect(await userRepository.getUser(email)).toBeDefined();
      } catch(err) {
        expect(err).toBeUndefined()
      }
    });
  
    it("should return an error if failed get an user", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        await userRepository.getUser(email);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  })

  describe("save author", () => {
    it("should save an author", async () => {
      mock.expects("query").once().withArgs("INSERT INTO users (email, first_name, last_name, salt, hashed_password, token, token_expiry) VALUES (?, ?, ?, ?, ?, ?, ?)");
  
      try {
        userRepository.saveAuthor(author)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should save an author without reset password token", async () => {
      mock.expects("query").once().withArgs("INSERT INTO users (email, first_name, last_name, salt, hashed_password, token, token_expiry) VALUES (?, ?, ?, ?, ?, ?, ?)");
  
      try {
        userRepository.saveAuthor(authorWithoutResetPasswordToken)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });
  
    it("should return an error if failed get an save author", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        await userRepository.saveAuthor(author);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  })

  describe("update user", () => {
    it("should update an user", () => {
      mock.expects("query").once().withArgs("UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ?, token = ?, token_expiry = ? WHERE email = ?");
    
      try {
        userRepository.updateUser(author)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should update an user without reset password token", () => {
      mock.expects("query").once().withArgs("UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ?, token = ?, token_expiry = ? WHERE email = ?");
    
      try {
        userRepository.updateUser(authorWithoutResetPasswordToken)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should return an error if failed update an user", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        await userRepository.updateUser(author);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  })

  describe("delete author", () => {
    it("should delete an author", () => {
      mock.expects("query").once().withArgs("DELETE FROM users WHERE is_administrator = FALSE AND email = ?");
  
      try {
        userRepository.deleteAuthor(email)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed delete an author", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);

      try {
        await userRepository.deleteAuthor(email)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
});
