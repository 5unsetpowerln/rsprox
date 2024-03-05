import { listen } from "@tauri-apps/api/event";
import { w as writable } from "./index.js";
const charset_options = [
  { id: "0", text: "UTF_8" },
  { id: "1", text: "SHIFT_JIS" }
];
class Body {
  charset;
  str;
  raw;
  constructor(body_from_backend) {
    this.charset = body_from_backend.charset;
    this.str = body_from_backend.str;
    this.raw = body_from_backend.raw;
  }
  get_str() {
    return this.str;
  }
  get_raw() {
    return this.raw;
  }
  get_charset() {
    return this.charset;
  }
  get_length() {
    return this.raw.length;
  }
}
class Headers {
  array;
  constructor(array) {
    this.array = array;
  }
  find_by_name(name) {
    return this.array.find((header) => header.name === name);
  }
  // detect content extension from content-type.
  // if content-type is 'text/html', this returns 'html' for example.
  // if content-type isn't defined or doesn't contain 'text', this returns undefined.
  content_extension() {
    const content_type = this.find_by_name("content-type");
    if (content_type === void 0) {
      return void 0;
    }
    const extension = content_type.value.split(";")[0];
    if (extension.includes("html")) {
      return "html";
    } else if (extension.includes("javascript")) {
      return "javascript";
    } else if (extension.includes("json")) {
      return "json";
    }
  }
  get_array() {
    return this.array;
  }
}
class Request {
  id;
  headers;
  uri;
  method;
  version;
  body;
  constructor(request_from_backend) {
    this.id = request_from_backend.id;
    this.uri = request_from_backend.uri;
    this.headers = new Headers(request_from_backend.headers);
    this.method = request_from_backend.method;
    this.version = request_from_backend.version;
    this.body = new Body(request_from_backend.body);
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
    this.headers = new Headers(response_from_backend.headers);
    this.status = response_from_backend.status;
    this.body = new Body(response_from_backend.body);
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
const history = writable([]);
async function get_small_history(current_history) {
  const history_list = [];
  for (const pair of current_history) {
    if (pair.request !== void 0) {
      if (pair.response !== void 0) {
        history_list.push({
          id: pair.id,
          method: pair.request.get_method(),
          uri: pair.request.get_uri(),
          status: String(pair.response.get_status()),
          length: String(pair.response.get_body().get_length())
        });
      } else {
        history_list.push({
          id: pair.id,
          method: pair.request.get_method(),
          uri: pair.request.get_uri(),
          status: "",
          length: ""
        });
      }
    }
  }
  return history_list;
}
function get_small_history_header(a_small_history_entry) {
  const result = [];
  for (const key in a_small_history_entry) {
    const value = key.charAt(0).toUpperCase() + key.slice(1);
    result.push({ key, value });
  }
  return result;
}
async function proxy_start() {
  await listen("proxy_send_request_to_frontend", (data_from_backend) => {
    const request_from_backend_json = data_from_backend.payload;
    const request_from_backend = JSON.parse(request_from_backend_json);
    const request = new Request(request_from_backend);
    history.update((current_history) => {
      current_history.push({
        id: request.get_id(),
        request,
        response: void 0
      });
      return current_history;
    });
  });
  await listen("proxy_send_response_to_frontend", (data_from_backend) => {
    const response_from_backend_json = data_from_backend.payload;
    const response_from_backend = JSON.parse(response_from_backend_json);
    const response = new Response(response_from_backend);
    history.update((current_history) => {
      const index = current_history.findIndex((pair) => pair.id === response.get_id());
      current_history[index].response = response;
      return current_history;
    });
  });
}
export {
  get_small_history as a,
  charset_options as c,
  get_small_history_header as g,
  history as h,
  proxy_start as p
};
