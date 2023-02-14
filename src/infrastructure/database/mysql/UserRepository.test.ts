import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as UserRepositoryDomain from "../../../domain/repository/UserRepository";
import Email from "../../../domain/valueobject/Email";
import UserRepository from "./UserRepository";

describe("User Repository MySQL", () => {
  let connection: Connection = mysql.createConnection({ host: "localhost" });
  let mock: SinonMock = sinon.mock(connection);
  let repository: UserRepositoryDomain.default = new UserRepository(connection);
  let email: Email = new Email("admin@example.com");

  it("should return an administrator", async () => {
    mock
      .expects("query")
      .once()
      .withArgs(
        "SELECT first_name, last_name, salt, hashed_password FROM users WHERE email = ? AND is_administrator IS TRUE LIMIT 1"
      )
      .callsArgWith(
        2,
        null,
        [
          {
            first_name: "Admin",
            last_name: "",
            salt: "$2b$10$z1e0ySIYbA/5FXNzZy.Qge",
            hashed_password:
              "$2b$10$z1e0ySIYbA/5FXNzZy.Qgefti4GC8YwobSbO81EfD9JTuX/X1J1Xu",
          },
        ],
        ["first_name", "last_name", "salt", "hashed_password"]
      );

    expect(await repository.getAdministrator(email)).toBeDefined();
  });

  it("should return an error if failed get an administrator", async () => {
    mock.expects("query").once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.getAdministrator(email);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should return an author", async () => {
    mock
      .expects("query")
      .once()
      .withArgs(
        "SELECT first_name, last_name, salt, hashed_password FROM users WHERE email = ? AND is_administrator IS FALSE LIMIT 1"
      )
      .callsArgWith(
        2,
        null,
        [
          {
            first_name: "author",
            last_name: "",
            salt: "$2b$10$z1e0ySIYbA/5FXNzZy.Qge",
            hashed_password:
              "$2b$10$z1e0ySIYbA/5FXNzZy.Qgefti4GC8YwobSbO81EfD9JTuX/X1J1Xu",
          },
        ],
        ["first_name", "last_name", "salt", "hashed_password"]
      );

    expect(await repository.getAuthor(email)).toBeDefined();
  });

  it("should return an error if failed get an author", async () => {
    mock.expects("query").once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.getAuthor(email);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  // it("should delete an author", async () => {
  // 	mock.expects("query").once().withArgs("DELETE FROM users")

  // 	try {
  // 		await repository.deleteAuthor(email)
  // 	} catch(err) {
  // 		expect(err).toBeUndefined()
  // 	}
  // })

  // it("should return an error if failed delete an author", async () => {
  // 	mock.expects("query").once().callArgWith(2, new Error(), null, null);

  // 	try {
  // 		await repository.deleteAuthor(email)
  // 	} catch (err) {
  // 		expect(err).toBeInstanceOf(Error)
  // 	}
  // })
});
