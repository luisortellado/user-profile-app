import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import Home from './src/screens/Home';

const queryClientInstance = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
