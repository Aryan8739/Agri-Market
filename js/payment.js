const products = JSON.parse(localStorage.getItem('products')) || [];
const selectedProductId = localStorage.getItem('selectedProductId');
const selectedProduct = products.find(p => p.id == selectedProductId);

if (!selectedProduct) {
  alert('No product selected!');
  window.location.href = 'buyer.html';
}

document.getElementById('productName').innerText = selectedProduct.name;
document.getElementById('productPrice').innerText = selectedProduct.price;
document.getElementById('availableQuantity').innerText = selectedProduct.quantity;

document.getElementById('quantity').addEventListener('input', function () {
  const quantity = parseInt(this.value);
  const total = quantity * selectedProduct.price;
  document.getElementById('totalAmount').innerText = isNaN(total) ? 0 : total;
});

document.getElementById('paymentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const quantity = parseInt(document.getElementById('quantity').value);
  const paymentMethod = document.getElementById('paymentMethod').value;
  const address = document.getElementById('address').value;

  if (quantity > selectedProduct.quantity) {
    alert('Requested quantity exceeds available stock.');
    return;
  }

  selectedProduct.quantity -= quantity;
  localStorage.setItem('products', JSON.stringify(products));

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const newOrder = {
    id: Date.now(),
    productName: selectedProduct.name,
    quantity,
    paymentMethod,
    address,
    date: new Date().toLocaleDateString()
  };

  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('Order placed successfully!');

  setTimeout(() => {
    window.location.href = 'myorders.html';
  }, 500);
});
