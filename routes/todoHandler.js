const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema')
//create todo model-> Todo=new mongoose.model('model_name','which_schema') 
const Todo = new mongoose.model('Todo',todoSchema);

//get all the todos
router.get('/', async (req, res) => {
  try {
    const todos=await Todo.find({status: "active"});

    res.status(200).json({
     data: todos,
      message: 'All Todos were inserted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server side error',
      details: error.message,
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
     res.status(200).json({
       message: 'Todo fetched successfully',
       data: todo,
     });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server-side error',
      details: error.message,
    });

  }
});

//post a todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();

    res.status(200).json({
      message: 'Todo was inserted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server side error',
      details: error.message,
    });
  }
});
//post multiple todo

router.post('/all', async (req, res) => {
 try {
   await Todo.insertMany(req.body);
   res.status(200).json({
     message: 'Todos were inserted successfully',
   });
 } catch (error) {
  res.status(500).json({
    error: 'There were a server side error',
    details: error.message,
  });
 }
});

//put todo

router.put('/:id', async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: 'inactive',
          Date: new Date(),
        },
      }
    );
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Server error while updating todo',
      details: error.message,
    });
  }
});
 



//delete todo

router.delete('/:id', async (req, res) => {
   try {
     const deleted = await Todo.deleteOne({ _id: req.params.id });
     if (deleted.deletedCount === 0) {
       return res.status(404).json({ message: 'Todo not found' });
     }
     res.status(200).json({ message: 'Todo deleted successfully' });
   } catch (error) {
     res.status(500).json({
       error: 'Server error while deleting todo',
       details: error.message,
     });
   }
});

module.exports = router;