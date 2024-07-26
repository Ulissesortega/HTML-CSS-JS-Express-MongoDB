document.getElementById('checkOrderButton').addEventListener('click', async function() {
  // Get the value from the input field and trim any leading/trailing whitespace
  const invoiceNumber = document.getElementById('invoiceNumber').value.trim();
  
  // Check if the input field is empty
  if (!invoiceNumber) {
    document.getElementById('orderStatus').textContent = 'Please enter an invoice number.';
    return;
  }

  try {
    // Fetch the order status from the server
    const response = await fetch(`/order-status?invoice_number=${invoiceNumber}`);
    
    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    
    // Update the order status element with the response data
    document.getElementById('orderStatus').textContent = `Order Status: ${data.order_status}`;
  } catch (error) {
    // Log the error and display a user-friendly message
    console.error('Error:', error);
    document.getElementById('orderStatus').textContent = 'An error occurred while fetching the order status.';
  }
});
