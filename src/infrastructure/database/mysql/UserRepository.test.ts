import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as UserRepositoryDomain from "../../../domain/repository/UserRepository";
import UserRepository from "./UserRepository";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";
import Author from "../../../domain/entity/Author";
import Email from "../../../domain/valueobject/Email";
import Administrator from "../../../domain/entity/Administrator";

describe("User Repository MySQL", () => {
  let connection: Connection = mysql.createConnection({
    host: "localhost",
  });
  let mock: SinonMock = sinon.mock(connection);
  let repository: UserRepositoryDomain.default = new UserRepository(connection);
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

  it("should return an insert/save author", async () => {
    mock
      .expects("query")
      .once()
      .withArgs(
        "INSERT INTO users (email, first_name, last_name, salt, hashed_password, is_administrator) VALUES (?, ?, ?, ?, ?)"
      )
      .callsArgWith(
        2,
        null,
        [
          {
            email: author.email.string(),
            first_name: author.name.first,
            last_name: author.name.last,
            salt: author.password.salt,
            hashed_password: author.password.hashedPassword,
            is_administrator: "FALSE",
          },
        ],
        ["first_name", "last_name", "salt", "hashed_password", "email"]
      );
    expect(await repository.saveAuthor(author)).toBeDefined();
  });

  it("should return an error if failed get an insert/save author", async () => {
    mock.expects("query").once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.saveAuthor(author);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should return an update administrator", async () => {
    mock
      .expects("query")
      .once()
      .withArgs(
        `UPDATE users SET first_name = ?, last_name = ?, salt = ?, hashed_password = ? WHERE email = ? AND is_administrator IS TRUE`
      )
      .callsArgWith(
        2,
        null,
        [
          {
            first_name: administrator.name.first,
            last_name: administrator.name.last,
            salt: administrator.password.salt,
            hashed_password: administrator.password.hashedPassword,
            email: administrator.email.string(),
          },
        ],
        ["first_name", "last_name", "salt", "hashed_password", "email"]
      );
    expect(await repository.updateAdministrator(administrator)).toBeDefined();
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
