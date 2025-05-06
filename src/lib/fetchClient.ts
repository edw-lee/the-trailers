import deepmerge from "deepmerge";

export enum HttpStatusCodes {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SUCCESS = 200,
  CREATED = 201,
  NOCONTENT = 204,
  LOGIN_TIMEOUT = 440,
  TOO_MANY_REQUESTS = 429,
}

export type Error = {
  status: HttpStatusCodes;
  statusText: string;
};

export class FetchClientInterceptor<T> {
  callback?: (value: T) => Promise<T>;

  constructor() {}

  use(callback: (value: T) => Promise<T>) {
    this.callback = callback;
  }
}

export type FetchClientRequestInit = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | undefined;
};

export class FetchClient {
  baseURL?: string;
  defaultInit?: RequestInit;
  interceptors = {
    request: new FetchClientInterceptor<{
      config: FetchClientRequestInit;
      requestUrl: string;
    }>(),
    response: new FetchClientInterceptor<ResponseInit>(),
    error: new FetchClientInterceptor<{ error: Error | null; url: string }>(),
  };

  constructor(opts?: { baseURL?: string; defaultInit?: RequestInit }) {
    this.baseURL = opts?.baseURL;
    this.defaultInit = opts?.defaultInit;
  }

  async fetch(input: string, init?: FetchClientRequestInit) {
    if (input.toString().slice(0, 1) !== "/") {
      input = `/${input}`;
    }

    if (init?.body && typeof init.body != "string") {
      init.body = JSON.stringify(init.body);
    }

    if (this.interceptors.request.callback) {
      const requestInterceptorInit = await this.interceptors.request.callback({
        config: init ?? {},
        requestUrl: input,
      });
      init = deepmerge(init ?? {}, requestInterceptorInit.config);
    }

    const mergedInit = deepmerge(this.defaultInit ?? {}, init ?? {});
    const url = this.baseURL ? `${this.baseURL}${input}` : input;
    return fetch(url, mergedInit)
      .then(async (response): Promise<Response> => {
        if (!response.ok) {
          let body;
          try {
            body = await response.json();
          } catch {}

          const error = <Error>{
            status: response.status,
            statusText: body?.message || undefined,
          };

          if (this.interceptors.error.callback) {
            const result = await this.interceptors.error.callback({
              error,
              url: input,
            });

            if (result.error) {
              throw result.error;
            } else {
              return this.fetch(url, init);
            }
          } else {
            throw error;
          }
        }

        if (response.redirected) {
          if (typeof window != "undefined") {
            if (window.location.href != response.url) {
              window.location.replace(response.url);
            }
          }
        }

        if (this.interceptors.response.callback) {
          this.interceptors.response.callback(response);
        }

        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
