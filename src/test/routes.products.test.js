const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { productsMock, ProductServicesMocks } = require('../utils/mocks');
const assert = require('assert');

describe('routes - products', () => {
  const resource = '/api/products';
  const route = proxyquire('../routes', {
    '../services': ProductServicesMocks
  });

  const request = testServer(route);

  describe('GET /products', () => {
    it('should response with status 200', done => {
      request.get(`${resource}`).expect(200, done);
    });

    it('shoul response with product list', done => {
      request.get(`${resource}`).end((error, response) => {
        assert.deepEqual(response.body, {
          data: productsMock,
          message: 'products listed'
        });
        done();
      });
    });
  });

  describe('GET /product/:productId', () => {
    const productId = 1;
    it('should response with status 200', done => {
      request.get(`${resource}/${productsMock}`).expect(200, done);
    });

    it('should response with product', done => {
      request.get(`${resource}/${productsMock}`).end((error, response) => {
        assert.deepEqual(response.body, {
          data: productsMock[0],
          message: 'product retrieved'
        });
        done();
      });
    });
  });

  describe('POST /product', () => {
    const productId = 1;
    it('should response with status 201', done => {
      request.post(`${resource}`).expect(201, done);
    });

    it('should response with productId', done => {
      request
        .post(`${resource}`)
        .send(productsMock[0])
        .end((error, response) => {
          assert.deepEqual(response.body, {
            data: productsMock[0].image,
            message: 'product created'
          });
          done();
        });
    });
  });

  describe('PUT /product/:productId', () => {
    const productId = 1;
    it('should response with status 200', done => {
      request.put(`${resource}/:productId`).expect(200, done);
    });

    it('should response with updatedId', done => {
      request
        .put(`${resource}/:productId`)
        .send(productsMock[0])
        .end((error, response) => {
          assert.deepEqual(response.body, {
            data: productsMock[0].image,
            message: 'product upserted'
          });
          done();
        });
    });
  });

  describe('DELETE /product/:productId', () => {
    const productId = 1;
    it('should response with status 200', done => {
      request.delete(`${resource}/:productId`).expect(200, done);
    });

    it('should response with deletedId', done => {
      request
        .delete(`${resource}/:productId`)
        .send(productsMock[0])
        .end((error, response) => {
          assert.deepEqual(response.body, {
            data: productsMock[0].image,
            message: 'product deleted'
          });
          done();
        });
    });
  });
});
