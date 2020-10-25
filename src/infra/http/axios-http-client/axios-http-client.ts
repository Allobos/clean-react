import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

// design pattern Adapter - estamos adaptando duas interfaces diferentes:
// uma interface é HttpPostclient<T, R> e a outra é Axios
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
