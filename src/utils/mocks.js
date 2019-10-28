const productsMock = [
  {
    image: 'https://arepa.s3.amazonaws.com/camiseta.png',
    title: 'Camiseta',
    price: 25,
    description: 'bla bla bla bla bla'
  },
  {
    image: 'https://arepa.s3.amazonaws.com/mug.png',
    title: 'Mug',
    price: 10,
    description: 'bla bla bla bla bla'
  },
  {
    image: 'https://arepa.s3.amazonaws.com/pin.png',
    title: 'Pin',
    price: 4,
    description: 'bla bla bla bla bla'
  },
  {
    image: 'https://arepa.s3.amazonaws.com/stickers1.png',
    title: 'Stickers',
    price: 2,
    description: 'bla bla bla bla bla'
  },
  {
    image: 'https://arepa.s3.amazonaws.com/stickers2.png',
    title: 'Stickers',
    price: 2,
    description: 'bla bla bla bla bla'
  },
  {
    image: 'https://arepa.s3.amazonaws.com/hoodie.png',
    title: 'Hoodie',
    price: 35,
    description: 'bla bla bla bla bla'
  }
];

class ProductServicesMocks {
  async getProducts() {
    return Promise.resolve(productsMock);
  }

  async getProduct() {
    return Promise.resolve(productsMock[0]);
  }

  async createProduct() {
    return Promise.resolve(productsMock[0].image);
  }

  async updateProduct() {
    return Promise.resolve(productsMock[0].image);
  }

  async deleteProduct() {
    return Promise.resolve(productsMock[0].image);
  }
}

module.exports = {
  productsMock,
  ProductServicesMocks
};
