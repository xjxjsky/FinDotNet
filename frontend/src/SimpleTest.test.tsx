import React from 'react';
import { render } from '@testing-library/react';

test('renders without crashing', () => {
  const { container } = render(<div>Hello World</div>);
  expect(container).toBeInTheDocument();
});
