import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingSpinner from "./common/LoadingSpinner";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
      <ReactQueryDevtools />
    </Suspense>
  </QueryClientProvider>
);


