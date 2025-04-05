document.getElementById('productForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;
  
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const newProduct = {
    id: Date.now(),
    name,
    description,
    price,
    quantity
  };
  
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  
  alert('Product added successfully!');
  document.getElementById('productForm').reset();
});