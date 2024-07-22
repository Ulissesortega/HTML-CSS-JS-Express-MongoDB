document.getElementById('checkOrderButton').addEventListener('click', async function() {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const response = await fetch(`/order-status?invoice_number=${invoiceNumber}`);
    const data = await response.json();
    const orderStatusElem = document.getElementById('orderStatus');
    
    if (response.ok) {
      orderStatusElem.textContent = `Order Status: ${data.order_status}`;
    } else {
      orderStatusElem.textContent = `Error: ${data.message}`;
    }
  });
  