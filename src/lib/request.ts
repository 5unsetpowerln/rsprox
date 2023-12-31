export interface RequestFromBackend {
  id: number;
  headers: Map<string, string>;
  uri: string;
  method: string;
  version: string;
  body: Uint8Array;
}

export class Request {
  private id: number;
  private headers: Map<string, string>;
  private uri: string;
  private method: string;
  private version: string;
  private body: Uint8Array;

  constructor(request_from_backend: RequestFromBackend) {
    this.id = request_from_backend.id;
    this.headers = request_from_backend.headers;
    this.uri = request_from_backend.uri;
    this.method = request_from_backend.method;
    this.version = request_from_backend.version;
    this.body = request_from_backend.body;
  }

  public get_id(): number {
    return this.id;
  }
}
