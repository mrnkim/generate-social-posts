import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Result } from '../Result'

describe('<Result />', () => {
  it('renders', () => {
    const queryClient = new QueryClient();
    const setIsSubmitted = cy.stub().as('setIsSubmitted'); // Mock setIsSubmitted function
    const video = null; // Mock video prop
    const isSubmitted = false; // Mock isSubmitted prop
    const prompt = ''; // Mock prompt prop
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Result
          video={video}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          prompt={prompt}
        />
      </QueryClientProvider>
    )
  })
})
