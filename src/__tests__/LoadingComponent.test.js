import React from 'react';
import { render } from '@testing-library/react';

import { LoadingComponent } from '../components/common';

describe('Loading Common Component', () => {
  test('it should mount a div based on props', () => {
    const { getByTestId } = render(
      <LoadingComponent message="Loading Content" />
    );
    const loader = getByTestId('loading');
    expect(loader).toBeInTheDocument();

    // const message = getByText(/loading content/i);
    // expect(message.textContent).toBe('Loading Content');
    // rerender(<LoadingComponent message="Loading User Profile" />);
    // const newMessage = getByText(/loading user profile/i);
    // expect(newMessage.textContent).toBe('Loading User Profile');
  });
});
