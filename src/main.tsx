import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "./infrastructure/config/query.client.ts";
import { AppRouter } from "./router/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientConfig}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>,
);
