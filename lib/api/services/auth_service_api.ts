import {APIRequest, APIRequestContext} from '@playwright/test'
import { ApiResponse } from '../interfaces/api_response'
import { json } from 'stream/consumers'

export class AuthService {
    uri: string

    constructor(private request: APIRequestContext) {
        this.uri = 'login'
    }

    async login<T, K = string, Z = string>(username: K, password: Z): Promise<ApiResponse & {headers: object}> {
        const response = await this.request.post(`/${this.uri}`, { 
            data: {login: username, password}
        })
        return {body: await response.json() as T, statusCode: response.status(), headers: response.headers()}
    }
}