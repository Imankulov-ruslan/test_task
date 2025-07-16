import { APIRequest, APIRequestContext } from "@playwright/test";
import { ApiResponse } from "../interfaces/api_response";
import { json } from "stream/consumers";

export class AuthService {
  loginUri: string;
  logoutUri: string;

  constructor(public request: APIRequestContext) {
    this.loginUri = "login";
    this.logoutUri = "logout";
  }

  async login<T = object, K = string, Z = string>(
    username: K,
    password: Z,
  ): Promise<ApiResponse & { headers: object }> {
    const response = await this.request.post(`/${this.loginUri}`, {
      data: { login: username, password },
    });
    return {
      body: (await response.json()) as T,
      statusCode: response.status(),
      headers: response.headers(),
    };
  }

  async logout<T = object | string | null>(headers?: {
    [key: string]: string;
  }): Promise<ApiResponse> {
    const response = await this.request.post(`/${this.logoutUri}`, { headers });
    const contentType = response.headers()["content-type"] || "";
    let responseData = null as T;
    if (contentType.includes("application/json")) {
      responseData = (await response.json()) as T;
    } else if (contentType.includes("text/plain")) {
      responseData = (await response.text()) as T;
    } else {
      console.warn("Unknown content type:", contentType);
    }
    return { body: responseData, statusCode: response.status() };
  }
}
