import { listen } from "@tauri-apps/api/event";
import { w as writable } from "./index.js";
class Request {
  id;
  headers;
  uri;
  method;
  version;
  body;
  constructor(request_from_backend) {
    this.id = request_from_backend.id;
    this.headers = request_from_backend.headers;
    this.uri = request_from_backend.uri;
    this.method = request_from_backend.method;
    this.version = request_from_backend.version;
    this.body = request_from_backend.body;
  }
  get_id() {
    return this.id;
  }
  get_method() {
    return this.method;
  }
  get_uri() {
    return this.uri;
  }
  get_headers() {
    return this.headers;
  }
  get_version() {
    return this.version;
  }
  get_body() {
    return this.body;
  }
}
class Response {
  id;
  headers;
  status;
  version;
  body;
  constructor(response_from_backend) {
    this.id = response_from_backend.id;
    this.headers = response_from_backend.headers;
    this.status = response_from_backend.status;
    this.body = response_from_backend.body;
    this.version = response_from_backend.version;
  }
  get_id() {
    return this.id;
  }
  get_headers() {
    return this.headers;
  }
  get_status() {
    return this.status;
  }
  get_version() {
    return this.version;
  }
  get_body() {
    return this.body;
  }
}
const history = writable(
  /* @__PURE__ */ new Map()
);
async function proxy_start() {
  await listen("proxy_send_request_to_frontend", (data_from_backend) => {
    const request_from_backend_json = data_from_backend.payload;
    const request_from_backend = JSON.parse(request_from_backend_json);
    const request = new Request(request_from_backend);
    history.update((pairs) => {
      const pair = {
        request,
        response: void 0
      };
      pairs.set(request.get_id(), pair);
      return pairs;
    });
  });
  await listen("proxy_send_response_to_frontend", (data_from_backend) => {
    const response_from_backend_json = data_from_backend.payload;
    const response_from_backend = JSON.parse(response_from_backend_json);
    const response = new Response(response_from_backend);
    history.update((pairs) => {
      const pair = pairs.get(response.get_id());
      pair.response = response;
      pairs.set(response.get_id(), pair);
      return pairs;
    });
  });
}
export {
  history as h,
  proxy_start as p
};
