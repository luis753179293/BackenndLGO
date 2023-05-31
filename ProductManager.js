const fs = require('fs');



class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    product.id = id;
    if (!products.some(prod => prod == product.code)){

    products.push(product);

    }else{
      return console.log('El codigo ya existe.')
    }

    if (product.title != undefined){
    fs.writeFileSync(this.path, JSON.stringify(products));
    }
    else{
      return console.log('Faltan propiedades en el producto.')
    }
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = fs.readFileSync(this.path, 'utf8');
    return JSON.parse(data);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, fieldsToUpdate) {
    const products = this.getProducts();
    const indexToUpdate = products.findIndex(product => product.id === id);
    if (indexToUpdate === -1) {
      return false;
    }
    const productToUpdate = products[indexToUpdate];
    Object.assign(productToUpdate, fieldsToUpdate);
    products.splice(indexToUpdate, 1, productToUpdate);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return true;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const indexToDelete = products.findIndex(product => product.id === id);
    if (indexToDelete === -1) {
      return false;
    }
    products.splice(indexToDelete, 1);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return true;
  }
}

module.exports = ProductManager;