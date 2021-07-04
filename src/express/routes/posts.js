import MockDataService from '../../services/MockDataservice';
import authMiddleware from '../middlewares/auth';

export default function addCoinRoutes(app) {
  app.get('/api/coin', authMiddleware, (req, res) => {
    res.json(MockDataService.getCoins());
  });

  app.get('/api/coin/:id', authMiddleware, (req, res) => {
    const { params } = req;
    const coin = MockDataService.findCoinId(params.id);

    if (coin) {
      res.json(MockDataService.findCoinId(params.id));
    } else {
      res.status(500);
      res.json({
        error: {
          message: 'Coin not found',
        },
      });
    }
  });

  app.post('/api/coin/create', authMiddleware, (req, res) => {
    const { body: coin } = req;

    MockDataService.createCoin(coin);

    res.json({ status: 'ok' });
  });

  app.post('/api/coin/reset', authMiddleware, (req, res) => {
    MockDataService.resetCoin();

    res.json({ status: 'ok' });
  });
}
