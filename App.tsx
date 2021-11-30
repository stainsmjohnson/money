import React from 'react';
import RootNavigation from './src/routes';
import ProviderWrapper from './src/utils/ProviderWrapper';

const App = () => {
  return (
    <ProviderWrapper>
      <RootNavigation />
    </ProviderWrapper>
  );
};

export default App;
