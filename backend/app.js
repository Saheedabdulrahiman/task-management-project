
const express = require('express');
const mongoose = require('mongoose');
const projectRoute = require('./routes/projectRoute')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());



const mongoURI = 'mongodb+srv://saheeda342:FoGPcBlLtywa8wYN@cluster0.l6faj8y.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Atlas connected');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define routes and other middleware here...
app.use('/api',projectRoute)


// Define server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
