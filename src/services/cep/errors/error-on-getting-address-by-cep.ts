export class ErrorOnGettingAddressByCep extends Error {
  constructor() {
    super('CEP is possibly invalid')
  }
}