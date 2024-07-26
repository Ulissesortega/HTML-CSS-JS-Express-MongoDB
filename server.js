const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = 'mongodb+srv://uortega1980:DataTest1@cluster0.mbwgnz0.mongodb.net/Invoice?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define schema and model
const invoiceStatusSchema = new mongoose.Schema({
  invoice_number: Number,
  order_status: String
});

const InvoiceStatus = mongoose.model('InvoiceStatus', invoiceStatusSchema, 'Invoices_Status');

// Middleware to serve static files
app.use(express.static('public'));

// Routes
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
    res.status(500).json({ message: `Please enter the correct Invoice Number: ${err.message}` });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
