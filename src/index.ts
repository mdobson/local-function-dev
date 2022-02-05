import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';

export const helloWorld: HttpFunction = (req, res) => {
  console.log('Test!');
  res.send('Hello!');
};
