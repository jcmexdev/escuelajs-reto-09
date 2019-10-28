const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoConnect.connection) {
      MongoConnect.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected successfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoConnect.connection;
  }

  seeder(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertMany(data);
      })
      .then(result => result.insertedIds);
  }

  /**
   * Get all the documents in the collection
   */
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find()
        .toArray();
    });
  }

  /**
   * Get only one document in the collection by id
   */
  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  /**
   * Create new document
   */
  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }
  /**
   * Update (or create) a document by id
   */
  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  /**
   * Delete one document of collection by id
   */
  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoConnect;
