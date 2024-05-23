const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomerModel = require('./models/Customer');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://swiopayment.netlify.app/' }));


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/MyDb';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// API route to create a customer
app.post('/payment', (req, res) => {
  CustomerModel.create(req.body)
    .then(customer => {
      console.log('Customer created:', customer);
      res.json(customer);
    })
    .catch(err => {
      console.log('Error creating customer:', err);
      res.status(500).send(err);
    });
});

// API route to get all customers
app.get('/getData', (req, res) => {
  console.log('Received request to /getData');
  CustomerModel.find()
    .then(customers => {
      console.log('Customers fetched:', customers);
      res.json(customers);
    })
    .catch(err => {
      console.log('Error fetching customers:', err);
      res.status(500).send(err);
    });
});

// API route to delete a customer
app.delete('/delete/:id', async (req, res) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    console.log(`Customer with ID ${req.params.id} deleted`);
    res.status(200).send('Record deleted');
  } catch (err) {
    console.log('Error deleting customer:', err);
    res.status(500).send(err);
  }
});

// API route to update a customer
app.put('/update/:id', async (req, res) => {
  try {
    const { name, amount } = req.body;
    const customer = await CustomerModel.findByIdAndUpdate(req.params.id, { name, amount }, { new: true });
    console.log(`Customer with ID ${req.params.id} updated to:`, customer);
    res.status(200).send('Record updated');
  } catch (err) {
    console.log('Error updating customer:', err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
