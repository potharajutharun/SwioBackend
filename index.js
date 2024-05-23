const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomerModel = require('./models/Customer');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MyDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/payment', (req, res) => {
  CustomerModel.create(req.body)
    .then(customer => res.json(customer))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/getData', (req, res) => {
  CustomerModel.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    res.status(200).send('Record deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/update/:id', async (req, res) => {
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
