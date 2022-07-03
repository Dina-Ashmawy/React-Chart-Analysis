import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { store } from '@/state/store';
import { BrowserRouter } from 'react-router-dom';

export const renderWrapper = (component: React.ReactNode): RenderResult => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    )
  };
};
