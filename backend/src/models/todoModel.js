//Importing pool 
const pool = require('../db');

// Gets all todos
const getAllTodos = async () => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return result.rows;
};

// Creates field item
const createTodo = async (title) => {
  const result = await pool.query(
    'INSERT INTO todos (title, completed) VALUES ($1, false) RETURNING *',
    [title]
  );
  return result.rows[0];
};

// Updates status of TODO
const updateTodo = async (id, title, completed) => {
    const result = await pool.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    return result.rows[0];
  };

// Deletes field item
const deleteTodo = async (id) => {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  };

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};