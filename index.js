const express = require('express');
const mongoose = require('mongoose');
const todoHandler=require('./routes/todoHandler')
const cors = require('cors');
const PORT = process.env.PORT || 5000;
//express app initialization
const app = express();
app.use(express.json());
app.use(cors());

//!database connection with mongoose
mongoose.connect('mongodb://localhost/todos')
 .then(()=>console.log('conncetion successfully'))
  .catch((err) => console.log(err))
 
//application routes
app.use('/todo', todoHandler);

//error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({error:err})
}


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));