import MockDataservice from '../services/MockDataservice';

export default function ExpressLoader(app) {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.get('/coin', (req, res) => {
    res.json(MockDataservice.getCoins());
  });
  app.get('/coin/:id', (req, res) => {
    const { params } = req;
    const coin = MockDataservice.findCoinId(params.id);
    if (coin) {
      res.json(MockDataservice.findCoinId(params.id));
    } else {
      res.status(500);
      res.json({
        error: {
          message: 'Coin not found',
        },
      });
    }
  });
}
