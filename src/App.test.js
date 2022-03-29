import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import AdminMenu from './pages/adminMenu'
import DataLoad from './pages/dataLoad'
import CreateSchedule from './pages/createSchedule'

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

test('renders admin menu screen', () => {
  render(<AdminMenu />);
  const linkElement = screen.getByText(/Menu/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders data load screen', () => {
  render(<DataLoad />);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
});

test('renders schedule screen', () => {
  render(<CreateSchedule />);
  const linkElement = screen.getByText(/Horario/i);
  expect(linkElement).toBeInTheDocument();
});