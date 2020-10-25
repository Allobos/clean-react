import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string

  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
} // Famoso mock - não tem retorno nenhum, só serve para capturar valor e mais nada
