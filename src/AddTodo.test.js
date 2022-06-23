import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';
import Home from "../src/pages/Home";
import { Experimental_CssVarsProvider } from '@mui/material';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputNew = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDueDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputNew, {target: {value : 'History test'}});
  fireEvent.change(inputDueDate, {target: {value : dueDate}});
  fireEvent.click(addBtn);
  fireEvent.change(inputNew, {target: {value : 'History test'}});
  fireEvent.change(inputDueDate, {target: {value : dueDate}});
  fireEvent.click(addBtn);


  const {queryAllByText} = render(<Home />);
  const check = queryAllByText('History test');
  expect(check).toHaveLength(1);
 });



 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

 });





 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
