import authMiddleware from '../middlewares/auth';
import CoinService from '../../services/CoinService';

export default function addCoinRoutes(app) {
  app.get('/api/coin', authMiddleware, async (req, res) => {
    const coin = await CoinService.getCoins();
    res.json(coin);
  });

  app.get('/api/coin/:id', authMiddleware, async (req, res) => {
    const { params } = req;
    const coin = await CoinService.findCoinId(params.id);

    if (coin) {
      res.json(await CoinService.findCoinId(params.id));
    } else {
      res.status(500);
      res.json({
        error: {
          message: 'Coin not found',
        },
      });
    }
  });

  app.post('/api/coin/create', authMiddleware, async (req, res) => {
    const { body: coin } = req;

    await CoinService.createCoin(coin);

    res.json({ status: 'ok' });
  });

  app.post('/api/coin/reset', authMiddleware, async (req, res) => {
    await CoinService.resetCoin();

    res.json({ status: 'ok' });
  });
}
