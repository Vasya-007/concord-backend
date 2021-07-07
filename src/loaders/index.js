/* eslint-disable no-console */
import expressLoader from './express';
import fixturesLoader from './fixtures';
// eslint-disable-next-line no-unused-vars
import dbLoader from './db';

export default async function RootLoader(app) {
  console.log('Connecting to DB');
  await dbLoader();
  console.log('DB +');
  console.log('Start express server');
  expressLoader(app);
  console.log('Success');
  await fixturesLoader();
}
