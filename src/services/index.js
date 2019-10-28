const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');
class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoConnect();
  }

  async seed({ products }) {
    const insertedIds = await this.mongoDB.seeder(this.collection, products);
    return insertedIds;
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createdId = await this.mongoDB.create(this.collection, product);
    return createdId;
  }

  async updateProduct({ productId, product }) {
    const updatedId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );
    return updatedId;
  }

  async deleteProduct({ productId }) {
    const deletedId = await this.mongoDB.delete(this.collection, productId);
    return deletedId;
  }
}

module.exports = ProductService;
