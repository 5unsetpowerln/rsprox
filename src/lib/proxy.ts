import { emit, listen } from "@tauri-apps/api/event";
import { writable, type Writable } from "svelte/store";
import { Request, type RequestFromBackend } from "./request";
import { Response, type ResponseFromBackend } from "./response";

export interface RequestResponsePair {
  request: Request;
  response: Response | undefined;
}

export const history: Writable<Map<number, RequestResponsePair>> = writable(
  new Map<number, RequestResponsePair>(),
);

export async function proxy_start() {
  await listen<string>(
    "proxy_send_request_to_frontend",
    (data_from_backend) => {
      let request_from_backend_json = data_from_backend.payload;
      let request_from_backend: RequestFromBackend = JSON.parse(
        request_from_backend_json,
      );
      let request = new Request(request_from_backend);

      history.update((pairs) => {
        let pair: RequestResponsePair = {
          request: request,
          response: undefined,
        };
        pairs.set(request.get_id(), pair);
        // console.log(pairs);
        return pairs;
      });
    },
  );

  await listen<string>(
    "proxy_send_response_to_frontend",
    (data_from_backend) => {
      let response_from_backend_json = data_from_backend.payload;
      let response_from_backend: ResponseFromBackend = JSON.parse(
        response_from_backend_json,
      );
      let response = new Response(response_from_backend);

      history.update((pairs) => {
        // failable?
        let pair = pairs.get(response.get_id()) as RequestResponsePair;
        pair.response = response;
        pairs.set(response.get_id(), pair);
        console.log(pairs);

        return pairs;
      });
    },
  );
}
