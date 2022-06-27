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
  const inputDueDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  const noTodo = screen.getByText("You have no todo's left")

  fireEvent.change(inputDueDate, {target: {value : dueDate}});
  fireEvent.click(addBtn);

  expect(noTodo).toBeInTheDocument();

 });





 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputNew = screen.getByRole('textbox', {name: /Add New Item/i});
  const addBtn = screen.getByRole('button', {name: /Add/i});
  const noTodo = screen.getByText("You have no todo's left")

  fireEvent.change(inputNew, {target: {value : 'History test'}});
  fireEvent.click(addBtn);

  expect(noTodo).toBeInTheDocument();

 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  const inputNew = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDueDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputNew, {target: {value : 'History test'}});
  fireEvent.change(inputDueDate, {target: {value : dueDate}});
  fireEvent.click(addBtn);

  const deleteTodo = screen.getByRole('checkbox');
  fireEvent.click(deleteTodo);

  const noTodo = screen.getByText("You have no todo's left");
  expect(noTodo).toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputNew = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDueDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /Add/i});

  const dueDate = "05/30/2023";
  const pastDate = "05/30/2020";

  fireEvent.change(inputNew, {target: {value : 'History test'}});
  fireEvent.change(inputDueDate, {target: {value : dueDate}});
  fireEvent.click(addBtn);

  fireEvent.change(inputNew, {target: {value : 'Math test'}});
  fireEvent.change(inputDueDate, {target: {value : pastDate}});
  fireEvent.click(addBtn);

  const historyTest = screen.getByTestId(/History test/i).style.backgroundColor
  const mathTest = screen.getByTestId(/Math test/i).style.backgroundColor

  expect(historyTest).toBe("white")
  expect(mathTest).toBe("rgb(237, 106, 106)")

 });
