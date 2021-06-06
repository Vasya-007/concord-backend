import bodyParser from 'body-parser';
import MockDataservice from '../services/MockDataservice';

export default function ExpressLoader(app) {
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.get('/api/coin', (req, res) => {
    res.json(MockDataservice.getCoins());
  });
  app.get('/api/coin/:id', (req, res) => {
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

  app.post('/api/coin/create', (req, res) => {
    const { body: coin } = req;
    MockDataservice.createCoin(coin);
    res.json({ status: 'goood' });
  });
  app.post('/api/coin/reset', (req, res) => {
    MockDataservice.resetCoin();
    res.json({ status: 'goooood' });
  });
  app.post('/api/coin/shift', (req, res) => {
    MockDataservice.shiftCoin();
    res.json({ status: 'goooood' });
  });
}
