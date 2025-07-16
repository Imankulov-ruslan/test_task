import { APIRequestContext } from "@playwright/test";
import { ApiResponse } from "../../interfaces/api_response";
import { BaseService } from "../base_service";
import { KlineIntervals } from "../../enums/klines";

export class KlinesService extends BaseService {
  uri: string;

  constructor(public request: APIRequestContext) {
    super();
    this.uri = "klines";
  }

  async get<T = object>(
    queryParams: { symbol: string; interval: KlineIntervals },
    optionalQueryParams?: object,
    headers?: { [key: string]: string },
  ): Promise<ApiResponse> {
    const response = await this.request.get(`/${this.uri}`, {
      params: { ...queryParams, ...optionalQueryParams },
      headers,
    });
    return this.processResponse<T>(response);
  }
}
