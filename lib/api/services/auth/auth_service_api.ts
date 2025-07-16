import { APIRequestContext } from "@playwright/test";
import { ApiResponse } from "../../interfaces/api_response";
import { BaseService } from "../base_service";

export class AuthService extends BaseService {
  loginUri: string;
  logoutUri: string;

  constructor(public request: APIRequestContext) {
    super();
    this.loginUri = "login";
    this.logoutUri = "logout";
  }

  async login<T = object, K = string, Z = string>(
    username: K,
    password: Z,
  ): Promise<ApiResponse & { headers?: object }> {
    const response = await this.request.post(`/${this.loginUri}`, {
      data: { login: username, password },
    });
    return this.processResponse<T>(response);
  }

  async logout<T = object | string | null>(headers?: {
    [key: string]: string;
  }): Promise<ApiResponse> {
    const response = await this.request.post(`/${this.logoutUri}`, { headers });
    return this.processResponse<T>(response);
  }
}
