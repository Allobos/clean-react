import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'

// factory para gerar um Authentication fake
export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
