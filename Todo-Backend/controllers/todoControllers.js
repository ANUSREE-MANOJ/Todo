const Todo = require('../models/Todo.js');


const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTodo = new Todo({
            title,
            completed: false,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = title || todo.title;
        todo.completed = completed !== undefined ? completed : todo.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        if(!id)
        {
            return res.status(404).json({ message: 'Todo not found' });

        }
        const todo = await Todo.findByIdAndDelete(id);


        res.json({ message: 'Todo removed' ,todo});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
