import { appDataSource } from "./data-source";
import { server } from "./http";
import { runMigrations } from "./infrastructure/run-migrations";
import { setupWebSocket } from "./adapters/websocket/WebSocketHandler"; // Ajuste o caminho conforme necessário
import { AppConstants } from "./config/AppConstants";

appDataSource
  .initialize()
  .then(async () => {
    await runMigrations();
    setupWebSocket();
    startServer();
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));

async function startServer() {
  server.listen(AppConstants.port, () => console.log(`Server is running on port ${AppConstants.port}`));
}
