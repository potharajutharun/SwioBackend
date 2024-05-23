const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomerModel = require('./models/Customer');
const app = express();

// Use environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/MyDb';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());
app.use(cors({ origin: 'https://swiobackend-1.onrender.com' }));

// Define API routes with relative paths
app.post('/payment', (req, res) => {
  CustomerModel.create(req.body)
    .then(customer => res.json(customer))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get('/getData', (req, res) => {
  CustomerModel.find()
    .then(customers => res.json(customers))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    res.status(200).send('Record deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { name, amount } = req.body;
    await CustomerModel.findByIdAndUpdate(req.params.id, { name, amount });
    res.status(200).send('Record updated');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
