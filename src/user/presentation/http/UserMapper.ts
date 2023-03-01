import { AuthorSnapshots } from "../../application/valueobject/AuthorSnapshot";
import Administrator from "../../domain/entity/Administrator";
import User from "../../domain/entity/User";
import Email from "../../domain/valueobject/Email";
import Name from "../../domain/valueobject/Name";
import Password from "../../domain/valueobject/Password";

export type AuthorJSON = {
  email: string;
  name: string;
}

export type AuthorsJSON = AuthorJSON[]

export type MeJSON = {
  email: string;
  name: {
    first: string;
    last: string;
    full: string;
  };
  is_administrator: boolean;
}

export type UserJSON = {
  email: string;
  name: {
    first: string;
    last: string;
    full: string;
  };
  password: {
    salt: string;
    hashed_password: string;
  }
  is_administrator: boolean;
}

export class AuthorMapper {
  public static toJSON(authors: AuthorSnapshots): AuthorsJSON {
    let authorsJSON: AuthorsJSON = []

    for (let author of authors) {
      authorsJSON.push({
        email: author.email,
        name: author.name
      })
    }

    return authorsJSON
  }
}

export default class UserMapper {
  public static fromJSON(user: UserJSON): MeJSON {
    return {
      email: user.email,
      name: {
        first: user.name.first,
        last: user.name.last,
        full: user.name.full
      },
      is_administrator: Boolean(user.is_administrator)
    }
  }

  public static toJSON(user: User): UserJSON {
    return {
      email: user.email.string(),
      name: {
        first: user.name.first,
        last: user.name.last,
        full: user.name.full()
      },
      password: {
        salt: String(user.password?.salt),
        hashed_password: String(user.password?.hashedPassword)
      },
      is_administrator: user.isAdministrator
    }
  }

  public static toAdministrator(userJSON: UserJSON): Administrator {
    return new Administrator(
      new Email(userJSON.email),
      new Name(userJSON.name.first, userJSON.name.last),
      new Password()
    )
  }
}