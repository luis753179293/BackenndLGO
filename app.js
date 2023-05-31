const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 4000; 

const productManager = new ProductManager('products.json'); 


app.get('/products', (req, res) => {
  try{
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts().slice(0, limit);
    res.json(products);
  }catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error en el servidor'});
  }
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});