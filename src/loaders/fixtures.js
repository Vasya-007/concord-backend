import UsersService from '../services/UsersService';
import { coinlistFactory } from '../__mocks__/coin';
import CoinService from '../services/CoinService';

const defaultUsers = [
  {
    email: 'a@a.com',
    password: '1234',
  },
];

export default async function fixtures() {
  defaultUsers.forEach((u) => {
    UsersService.createAccount(u);
  });
  const count = await CoinService.getCollection().find({}).count();
  if (count === 0) {
    const coins = coinlistFactory();
    Promise.all(coins.map((coin) => CoinService.createCoin(coin)));
  }
}
