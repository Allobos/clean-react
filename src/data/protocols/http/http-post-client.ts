import { HttpResponse } from './http-response'

export type HttpPostParams<T> = {
  url: string
  body?: T
}
// Tipos genéricos do Typescript
// T tipo do body do parâmetro
// R tipo do body da função
export interface HttpPostClient<T, R> {
  post (params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
