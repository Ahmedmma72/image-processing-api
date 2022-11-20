import { existsSync, unlinkSync } from 'fs';
import app from '..';
import supertest from 'supertest';
import path from 'path';
const request = supertest(app);

describe('testing accessing different routes', () => {
  it('sending a request to a non existing routes', async () => {
    const response = await request.get('/api/wrong');
    expect(response.status).toEqual(404);
  });
  it('sending a valid request with no caching', async () => {
    //first remove the image if it was cached
    const imageName = 'encenadaport_100_100.jpg';
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'Assets',
      'thumb',
      imageName
    );
    if (existsSync(imagePath)) {
      unlinkSync(imagePath);
    }
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=100'
    );
    expect(response.status).toEqual(200);
  });
  it('sending a valid request with caching based on the previous test', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=100'
    );
    expect(response.status).toEqual(304);
    //removing the cache
    const imageName = 'encenadaport_100_100.jpg';
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'Assets',
      'thumb',
      imageName
    );
    if (existsSync(imagePath)) {
      unlinkSync(imagePath);
    }
  });
  it('sending a request with unrealistic height to cause sharp library to throw an error that will be caught and a response with code 500 will be sent', async () => {
    //first remove the image if it was cached
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=100000'
    );
    expect(response.status).toEqual(500);
  });
});
describe('testing validateRequest responses', () => {
  it('sending a request with no filename', async () => {
    const response = await request.get('/api/images?width=100&height=100');
    expect(response.status).toEqual(400);
  });

  it('sending a request with no width', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&height=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with no height', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with a wrong filename', async () => {
    const response = await request.get(
      '/api/images?filename=wrongFilename&width=100&height=100'
    );
    expect(response.status).toEqual(404);
  });
  it('sending a request with a none numerical value for width', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=nonNumericalValue&height=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with a none numerical value for height', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=nonNumericalValue'
    );
    expect(response.status).toEqual(400);
  });
});
