export class ValidationRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationRequestError";
  }
}
