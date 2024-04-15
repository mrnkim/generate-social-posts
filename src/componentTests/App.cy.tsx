import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from '../App'

describe('<App />', () => {
  it('renders', () => {
    const queryClient = new QueryClient();
    cy.mount(
      <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>)
  })
})