class ExpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExpectedError";
  }
}

class AuthenticationError extends ExpectedError {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export { ExpectedError, AuthenticationError, InternalServerError };
