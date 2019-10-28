const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');
class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoConnect();
  }

  seed = async ({ products }) => {
    const insertedIds = await this.mongoDB.seeder(this.collection, products);
    return insertedIds;
  };

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }
}

module.exports = ProductService;
