const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
const mongoURI = 'mongodb+srv://uortega1980:DataTest1@cluster0.mbwgnz0.mongodb.net/Invoice?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema and a model
const invoiceStatusSchema = new mongoose.Schema({
  invoice_number: Number,
  order_status: String
});

const InvoiceStatus = mongoose.model('InvoiceStatus', invoiceStatusSchema, 'Invoices_Status');

// Define a route to get all orders and statuses from MongoDB
app.get('/orders', async (req, res) => {
  try {
    const orders = await InvoiceStatus.find({}, 'invoice_number order_status');
    console.log('Fetched orders:', orders); // Log the result
    res.send(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send(`Error fetching orders: ${err.message}`);
  }
});

// Define a route to get order status by invoice number
app.get('/order-status', async (req, res) => {
  const invoiceNumber = parseInt(req.query.invoice_number, 10);
  try {
    const order = await InvoiceStatus.findOne({ invoice_number: invoiceNumber }, 'order_status');
    if (order) {
      res.json({ order_status: order.order_status });
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (err) {
    res.status(500).json({ message: `Error fetching order status: ${err.message}` });
  }
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
