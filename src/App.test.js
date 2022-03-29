import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders login screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('button works, saves session info with correct login', () => {
  const utils = render(<App />);
  const input = utils.getByTestId('email-input');
  fireEvent.change(input, {target: {value: '123456@unizar.es'}})
  expect(input.value).toBe('123456@unizar.es')

  const button = screen.getByText('Login');
  fireEvent.click(button);

  expect(screen.getByTestId('session-text')).toHaveTextContent('Identificado como: 123456@unizar.es');
});
