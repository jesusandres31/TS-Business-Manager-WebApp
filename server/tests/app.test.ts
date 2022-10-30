import request from 'supertest';
import { App } from '../src/app';

// NOT WORKING
const app = new App();
const server = app.listen();

/*
describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    const result = await request(server).get('/api');
    expect(result.text).toEqual('Hello from the server');
    expect(result.status).toEqual(200);
  });
});
*/

/*
doesnt work because i cant export server from listen() method from app.ts
---
in tsconfi.json "include": ["./src/*", "./test/*"],
*/
