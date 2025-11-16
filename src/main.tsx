import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AppThemeProvider from "./context/AppThemeProvider";
import ErrorBoundary from "./components/common/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
              <AppThemeProvider>
                  <App />
              </AppThemeProvider>
          </QueryClientProvider>
      </ErrorBoundary>
  </React.StrictMode>
);
