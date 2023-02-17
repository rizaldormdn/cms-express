import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as UserRepositoryInterface from "../../../domain/repository/UserRepository";
import UserRepository from "./UserRepository";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";
import Author from "../../../domain/entity/Author";
import Email from "../../../domain/valueobject/Email";
import Administrator from "../../../domain/entity/Administrator";

describe("User Repository MySQL", () => {
  let connection: Connection = mysql.createConnection({host: "localhost"});
  let mock: SinonMock = sinon.mock(connection);
  let repository: UserRepositoryInterface.default = new UserRepository(connection);
  let email: Email = new Email("admin@example.com");
  let name: Name = new Name("author", "last");
  let password: Password = new Password("$2b$10$z1e0ySIYbA/5FXNzZy.Qge");
  let author: Author = new Author(email, name, password);
  let administrator = new Administrator(email, name, password);

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

  it("should save an author", async () => {
    mock.expects("query").once().withArgs("INSERT INTO users (email, first_name, last_name, salt, hashed_password) VALUES (?, ?, ?, ?, ?)");

    try {
      repository.saveAuthor(author)
    } catch (err) {
      expect(err).toBeUndefined()
    }
  });

  it("should return an error if failed get an insert/save author", async () => {
    mock.expects("query").once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.saveAuthor(author);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should update an administrator", async () => {
    mock.expects("query").once().withArgs("UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ? WHERE email = ? AND is_administrator IS TRUE");
  
    try {
      repository.updateAdministrator(administrator)
    } catch (err) {
      expect(err).toBeUndefined()
    }
  });

  it("should return an error if failed get an update administrator", async () => {
    mock.expects("query").once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.updateAdministrator(administrator);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
