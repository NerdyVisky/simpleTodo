const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/apiRoutes');
const mongoose = require("mongoose");
const path = require('path');

const app = express();

// init middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//Creating a backend Express server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server has started at PORT ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);


// Connect Database
mongoose.set('debug', true);
mongoose
  .connect("YOUR_MONGODB_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.log("ERROR", err.message);
  });

