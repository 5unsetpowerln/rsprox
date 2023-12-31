export interface ResponseFromBackend {
  id: number;
  headers: Map<String, String>;
  status: number;
  version: String;
  body: Uint8Array;
}

export class Response {
  private id: number;
  private headers: Map<String, String>;
  private status: number;
  private version: String;
  private body: Uint8Array;

  constructor(response_from_backend: ResponseFromBackend) {
    this.id = response_from_backend.id;
    this.headers = response_from_backend.headers;
    this.status = response_from_backend.status;
    this.body = response_from_backend.body;
    this.version = response_from_backend.version;
  }

  public get_id() {
    return this.id;
  }
}
