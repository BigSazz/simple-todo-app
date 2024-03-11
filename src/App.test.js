import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Add Task button', () => {
  const { getByTestId } = render(<App />);
  const addButton = getByTestId('add-task-button');
  expect(addButton).toBeInTheDocument();
});

test('clicking on Add Task button shows form', () => {
  const { getByTestId } = render(<App />);
  const addButton = getByTestId('add-task-button');
  fireEvent.click(addButton);
  const taskInput = getByTestId('task-name');
  expect(taskInput).toBeInTheDocument();
});

test('adding a new task', () => {
  const { getByTestId, queryByText } = render(<App />);
  const addButton = getByTestId('add-task-button');
  fireEvent.click(addButton);
  const taskInput = getByTestId('task-name');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  const saveButton = getByTestId('add-button');
  fireEvent.click(saveButton);
  expect(queryByText('New Task')).toBeInTheDocument();
});

test('editing a task', () => {
  const { getByTestId, queryByText } = render(<App />);
  const addButton = getByTestId('add-task-button');
  fireEvent.click(addButton);
  const taskInput1 = getByTestId('task-name');
  fireEvent.change(taskInput1, { target: { value: 'New Task' } });
  const saveButton1 = getByTestId('add-button');
  fireEvent.click(saveButton1);
  const editButton = getByTestId('edit-task');
  fireEvent.click(editButton);
  const taskInput2 = getByTestId('task-name');
  fireEvent.change(taskInput2, { target: { value: 'Updated Task' } });
  const saveButton2 = getByTestId('edit-button');
  fireEvent.click(saveButton2);
  expect(queryByText('Updated Task')).toBeInTheDocument();
});

test('deleting a task', () => {
  const { getByTestId, queryByText } = render(<App />);
  const addButton = getByTestId('add-task-button');
  fireEvent.click(addButton);
  const taskInput1 = getByTestId('task-name');
  fireEvent.change(taskInput1, { target: { value: 'New Task' } });
  const saveButton1 = getByTestId('add-button');
  fireEvent.click(saveButton1);
  const editButton = getByTestId('edit-task');
  fireEvent.click(editButton);
  const deleteButton = getByTestId('delete-button');
  fireEvent.click(deleteButton);
  expect(queryByText('New Task')).not.toBeInTheDocument();
});
