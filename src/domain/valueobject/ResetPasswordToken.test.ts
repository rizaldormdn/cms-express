import ResetPasswordToken from "./ResetPasswordToken"

describe("ResetPasswordToken", () => {
  it("should have token and expiration", () => {
    let resetPasswordToken = new ResetPasswordToken()

    expect(resetPasswordToken.token).toBeDefined()
    expect(resetPasswordToken.tokenExpiry).toBeDefined()
  })

  it("could have defined token and expiration", () => {
    let resetPasswordToken = new ResetPasswordToken("abc123", new Date())

    expect(resetPasswordToken.token).toBeDefined()
    expect(resetPasswordToken.tokenExpiry).toBeDefined()
  })

  it("could verify token expiration", () => {
    let tokenExpiry = new Date()

    tokenExpiry.setHours(tokenExpiry.getHours() - 1)

    let resetPasswordToken = new ResetPasswordToken("abc123", tokenExpiry)

    expect(() => resetPasswordToken.verify("abc123")).toThrowError()
  })

  it("could verify wrong token", () => {
    let resetPasswordToken = new ResetPasswordToken()

    expect(resetPasswordToken.verify("wrongtoken")).toBeFalsy()
  })

  it("could verify right token", () => {
    let resetPasswordToken = new ResetPasswordToken("abc123")

    expect(resetPasswordToken.verify("abc123")).toBeTruthy()
  })
})