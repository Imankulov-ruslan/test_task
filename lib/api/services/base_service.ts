import { APIResponse } from "@playwright/test";
import { ApiResponse } from "../interfaces/api_response";

export class BaseService {
  constructor() {}

  async processResponse<T = object>(
    response: APIResponse & { headers: object },
  ): Promise<ApiResponse> {
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
