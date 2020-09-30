import { RemoteAuthentication } from './remote-authentication'
// import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
