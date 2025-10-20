import React from 'react';
import { PageTemplate } from '../components/PageTemplate/PageTemplate';
import { ProcessSelect } from '../components/ProcessSelect/ProcessSelect';

const LandingPage: React.FC = () => {
  return (
    <PageTemplate>
      <h1>Welcome to the Landing Page</h1>
      <ProcessSelect />
    </PageTemplate>
  );
};

export default LandingPage;
