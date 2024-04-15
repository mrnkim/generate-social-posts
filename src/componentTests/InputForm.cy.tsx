import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InputForm } from '../InputForm'

describe('<InputForm />', () => {
  it('renders', () => {
    const queryClient = new QueryClient();
    cy.mount(
      <QueryClientProvider client={queryClient}>
    <InputForm />
    </QueryClientProvider>
    )
  })
})