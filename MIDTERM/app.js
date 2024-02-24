const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const studentsRouter = require('./routes/student');

dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database'))
.catch(error => console.error('Error connecting to the database:', error));

app.set('view engine', 'pug');

// Middleware
app.use(express.json());

// Use the students router
app.use('/students', studentsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
