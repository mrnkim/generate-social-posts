import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VideoFileUploadForm } from '../../src/VideoFileUploadForm'

describe("<VideoFileUploadForm />", () => {
  it("renders", () => {
    const queryClient = new QueryClient();
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <VideoFileUploadForm />
      </QueryClientProvider>
    );
  });
});