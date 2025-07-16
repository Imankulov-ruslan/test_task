import { APIRequestContext } from "@playwright/test";
import { ApiResponse } from "../../interfaces/api_response";
import { BaseService } from "../base_service";

export class TimeService extends BaseService {
  uri: string;

  constructor(public request: APIRequestContext) {
    super();
    this.uri = "time";
  }

  async getCurrentTime<T = object>(): Promise<ApiResponse> {
    const response = await this.request.get(`/${this.uri}`);
    return this.processResponse<T>(response);   
  }
}
