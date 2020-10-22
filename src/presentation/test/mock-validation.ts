import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string {
  // validate (input: object): string {
    return this.errorMessage
  }
}
