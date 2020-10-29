import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domain/erros'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    if (!accessToken) { // se não tiver accessToken
      throw new UnexpectedError() // lance um erro inexperado
    }
    await this.setStorage.set('accessToken', accessToken)
  }
}
