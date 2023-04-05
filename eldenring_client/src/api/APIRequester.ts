import axios, { AxiosResponse } from 'axios';

type APIRequestParameter = {
  url: string,
  method: HttpMethod,
  requestBody?: object | null
};

const DOMAIN = 'http://localhost:5000';

const axiosInst = axios.create({
  baseURL: DOMAIN,
  timeout: 10000
});

export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
};

export default class APIRequestBuilder {
  private _url: string | null = null;;
  private _method: HttpMethod | null = null;
  // private _isFormData: boolean = false;
  // private _formData: FormData | null = null;
  private _requestBody: object | null = null;

  public url(url: string): APIRequestBuilder {
    this._url = url;
    return this;
  }

  public get(): APIRequestBuilder {
    this._method = HttpMethod.get;
    return this;
  }

  public post(requestBody?: object | null): APIRequestBuilder {
    this._method = HttpMethod.post;

    if (requestBody !== undefined) {
      this._requestBody = requestBody;
    }

    return this;
  }

  public put(requestBody?: object | null): APIRequestBuilder {
    this._method = HttpMethod.put;

    if (requestBody !== undefined) {
      this._requestBody = requestBody;
    }

    return this;
  }

  public delete(): APIRequestBuilder {
    this._method = HttpMethod.delete;
    return this;
  }

  // multipart(formData: FormData): APIRequestBuilder {
  //   this._isFormData = true;
  //   this._formData = formData;
  //   return this;
  // }

  private _makeRequest(): APIRequestParameter {
    if (this._url === null) throw Error('url is invalid');
    if (this._method === null) throw Error('method is invalid');

    const params: APIRequestParameter = {
      url: this._url,
      method: this._method,
      requestBody: this._requestBody
    };

    // console.log(`---- ${params.url} ----`, params.requestBody);

    // if (this._isFormData) {
    //     params.reqData = this._formData;
    // }

    return params;
  }

  private async _callAPI<R>(params: APIRequestParameter): Promise<{item?: R, items?: R[]}> {
    const { url, method, requestBody } = params;
    let axiosResponse: AxiosResponse;

    try {
      switch (method) {
        case HttpMethod.get:
          axiosResponse = await axiosInst.get(url);
          break;

        case HttpMethod.post:
          axiosResponse = await axiosInst.post(url, requestBody);
          break;

        case HttpMethod.put:
          axiosResponse = await axiosInst.put(url, requestBody);
          break;

        case HttpMethod.delete:
          axiosResponse = await axiosInst.delete(url);
          break;
      }

      this.checkHttpBodyIsHtmlDocument(axiosResponse.data);

      return axiosResponse.data;

    } catch (error) {
      console.error('_callAPI', error);
      throw error;
    }
  }

  private checkHttpBodyIsHtmlDocument(body: any) {
    // 추후 서버에서 에러처리를 먼저 처리하는 방식으로 변경
    if (body.errorCode === 'error') {
      throw Error(`DB Error! ${body.errorMessage}`);
    }

    if (typeof body === 'string' && body.includes('<html') === true) {
      throw Error('404 Not Found');
    }
  }

  private _handleInvalidResponse(message: string): never {
    throw Error('Received Invalid Response - ' + message);
  }

  public async requestSingle<R>(): Promise<R> {
    const result = await this._callAPI<R>(this._makeRequest());

    // console.info('requestSingle', result);

    if (result.item === undefined) {
      this._handleInvalidResponse('result.item is undefined');
    }

    return result.item;
  }

  public async requestList<R>(): Promise<R[]> {
    const result = await this._callAPI<R>(this._makeRequest());

    // console.info('requestList', result);

    if (result.items === undefined) {
      this._handleInvalidResponse('result.items is undefined');
    }

    return result.items;
  }

  public async requestNone() {
      await this._callAPI<undefined | null | {}>(this._makeRequest());
  }
}