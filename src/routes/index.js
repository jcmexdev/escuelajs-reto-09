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

  router.get('/products', async (resquest, response, next) => {
    try {
      const storeProducts = await productService.getProducts();
      response.status(200).json({
        data: storeProducts,
        message: 'products listed'
      });
    } catch (error) {}
  });

  router.get('/products/:productId', async (request, response, next) => {
    try {
      const { productId } = request.params;
      const product = await productService.getProduct({ productId });
      response.status(200).json({
        data: product,
        message: 'product retrieved'
      });
    } catch (error) {}
  });

  router.post('/products', async (request, response, next) => {
    try {
      const { body: product } = request;
      const createdId = await productService.createProduct({ product });
      response.status(201).json({
        data: createdId,
        message: 'product created'
      });
    } catch (error) {}
  });

  router.put('/products/:productId', async (request, response, next) => {
    try {
      const { productId } = request.params;
      const { body: product } = request;
      const upsertedId = await productService.updateProduct({
        productId,
        product
      });
      response.status(200).json({
        data: upsertedId,
        message: 'product upserted'
      });
    } catch (error) {
      console.log(`error:${error}`);
    }
  });

  router.delete('/products/:productId', async (request, response, next) => {
    try {
      const { productId } = request.params;
      const deletedId = await productService.deleteProduct({ productId });
      response.status(200).json({
        data: deletedId,
        message: 'product deleted'
      });
    } catch (error) {
      console.log(`error:${error}`);
    }
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};

module.exports = platziStore;
