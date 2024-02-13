import { io } from "../../http";
import { WebSocketAdapter } from "./WebSocketAdpter";

export function setupWebSocket() {
  new WebSocketAdapter(io);
}
