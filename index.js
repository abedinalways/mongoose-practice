const express = require('express');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('🌐 REST API is running');
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));