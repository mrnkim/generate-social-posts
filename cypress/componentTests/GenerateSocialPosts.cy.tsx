import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GenerateSocialPosts } from '../../src/GenerateSocialPosts'

describe('<GenerateSocialPosts />', () => {
  it('renders', () => {
    const queryClient = new QueryClient();
    cy.mount(
      <QueryClientProvider client={queryClient}>
    <GenerateSocialPosts />
    </QueryClientProvider>
)
  })
})