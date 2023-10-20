import { Login } from '../src/shared/components';
import React, { ReactComponentElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppThemeProvider } from '../src/shared/contexts';


describe('Test Login Component', () => {
    let renderedComponent: React.ReactElement<any, string >;
    
    beforeEach(() => {
      renderedComponent = <AppThemeProvider ><Login children={undefined} /></AppThemeProvider >;
    });
  
    it('renders without errors', () => {
      render(renderedComponent);    
      
    });
});  