const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomerModel = require('./models/Customer');
const app = express();

app.use(express.json());
app.use(cors({origin:'https://swiobackend-1.onrender.com/'}));

mongoose.connect("mongodb://localhost:27017/MyDb");

app.post('https://swiobackend-1.onrender.com/payment', (req, res) => {
  CustomerModel.create(req.body)
    .then(customer => res.json(customer))
    .catch(err => console.log(err));
});

app.get('https://swiobackend-1.onrender.com/getData', (req, res) => {
  CustomerModel.find()
    .then(customers => res.json(customers))
    .catch(err => console.log(err));
});

app.delete('https://swiobackend-1.onrender.com/delete/:id', async (req, res) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    res.status(200).send('Record deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('https://swiobackend-1.onrender.com//update/:id', async (req, res) => {
  try {
    const { name, amount } = req.body;
    await CustomerModel.findByIdAndUpdate(req.params.id, { name, amount });
    res.status(200).send('Record updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
