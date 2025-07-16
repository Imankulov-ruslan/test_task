import {APIRequest, APIRequestContext} from '@playwright/test'
import { ApiResponse } from '../interfaces/api_response'
import { json } from 'stream/consumers'

export class AuthService {
    loginUri: string
    logoutUri: string

    constructor(public request: APIRequestContext) {
        this.loginUri = 'login'
        this.logoutUri = 'logout'
    }

    async login<T=object, K = string, Z = string>(username: K, password: Z): Promise<ApiResponse & {headers: object}> {
        const response = await this.request.post(`/${this.loginUri}`, { 
            data: {login: username, password}
        })
        return {body: await response.json() as T, statusCode: response.status(), headers: response.headers()}
    }

    async logout<T = object | string>(): Promise<ApiResponse>{
        const response = await this.request.post(`/${this.logoutUri}`)
        let body: T
        try {
            body = await response.json() as T
        } catch (error) {
            body = await response.text() as T
        }
        return {body, statusCode: response.status()}
    }
}