//Import todoModel repo
const todoModel = require('../models/todoModel');

//GET: Fetch all todos
const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); //500 Server Error
  }
};

// POST: Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = await todoModel.createTodo(title);
    console.log('New todo created:', newTodo); 
    res.status(201).json(newTodo); //201 Created
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT: Updates a todo by ID
const updateTodo = async(req, res) => {
    try {
        const id = req.params.id;
        const { title, completed } = req.body;
    
        const updatedTodo = await todoModel.updateTodo(id, title || '', completed);
    
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.json(updatedTodo);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update todo' });
      }
};

// DELETE: Remove a todo by ID (optional)
const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTodo = await todoModel.deleteTodo(id);
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' }); //404 Not Found
      }
      res.status(200).json(deletedTodo); //200 Ok 
    } catch (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

//Handling buisness logic with use of repo functionalities 
//req -> request object (Holds HTTP data)
//res -> response object (Sends back an HTTP response)
//res.json goes ahead and sends a response 
//req.body used to send new or updated data 
//req.params used to define variables in URL pattern 