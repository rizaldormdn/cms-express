// import HashPassword from "./HashPassword";
// import Password from "./Password";

// describe("password hash", async () => {
//   let password: Password = new Password("testpassword");
//   const hashed: string = await HashPassword.hash(password.password);

//   //   check password
//   let compare: boolean = await HashPassword.passwordComppare(
//     password.password,
//     hashed
//   );

//   test(`if password == ""`, () => {
//     let password: Password = new Password("");
//     expect(password.password).toBe("password tidak boleh kosong");
//   });
//   test("if password != hash password", () => {
//     expect(!compare.valueOf()).toBe(false);
//   });
//   test("if password == hash password", () => {
//     expect(compare.valueOf()).toBe(true);
//   });
// });

import Password from "./Password";

describe("password value object", () => {
  let salt = "$2b$10$WCZ6j4PLICecyCYvBvL7We";
  let password: Password = new Password();
  let existing: Password = new Password(salt);

  existing.hash = "password";

  test("salt should be defined", () => {
    expect(password.salt.length).toBeDefined();
  });

  test("salt can contain the existing one", () => {
    expect(existing.salt).toBe(salt);
  });

  test("hash should be defined", () => {
    password.hash = "password";

    expect(password.hash).toBeDefined();
  });

  it("can verify the existing password", () => {
    let other: Password = new Password(salt);

    other.hash = "password";

    expect(existing.verify("password")).toBeTruthy();
  });
});
