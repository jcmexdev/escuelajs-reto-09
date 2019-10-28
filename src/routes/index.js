const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf';
const { productsMock } = require('../utils/mocks');

const platziStore = app => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.post('/seed/products', async (request, response) => {
    try {
      const products = productsMock;
      const insertedIds = await productService.seed({ products });
      response.status(201).json({
        data: insertedIds,
        message: 'success products seed'
      });
    } catch (error) {}
  });

  router.get('/products', async (req, res, next) => {
    try {
      const storeProducts = await productService.getProducts();
      res.status(200).json({
        data: storeProducts,
        message: 'products listed'
      });
    } catch (error) {}
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};

module.exports = platziStore;
