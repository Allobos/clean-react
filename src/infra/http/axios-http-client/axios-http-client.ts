import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols/http'
import axios from 'axios'

// design pattern Adapter - estamos adaptando duas interfaces diferentes:
// uma interface é HttpPostclient<T, R> e a outra é Axios
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
