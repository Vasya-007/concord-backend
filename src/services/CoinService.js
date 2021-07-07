import MongoClientProvider from './MongoClientProvider';

class MockDataservice {
  collectionName = 'coin';

  getCollection() {
    return MongoClientProvider.db.collection(this.collectionName);
  }

  async getCoins() {
    return this.getCollection().find({}).toArray();
  }

  async findCoinId(_id) {
    return this.getCollection().findOne({ _id });
  }

  async createCoin(coin) {
    await this.getCollection().insert(coin);
    return coin;
  }

  async resetCoin() {
    await this.getCollection().remove({});
  }
}
export default new MockDataservice();
