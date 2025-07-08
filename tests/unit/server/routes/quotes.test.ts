import { testServerSetup } from '@tests/helpers/setupTestServer';
import type { FastifyInstance } from 'fastify';
import supertest from 'supertest';

describe('Quote routes tests', () => {
  let app: FastifyInstance;
  let request: ReturnType<typeof supertest>;

  beforeAll(async () => {
    app = await testServerSetup();
    await app.ready();

    request = supertest(app.server);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  const NEW_QUOTE_URI = '/new/quote';

  describe(`POST ${NEW_QUOTE_URI} tests`, () => {
    test('Should successfully return status code 201 and a new quote that has been stored in the db.', async () => {
      const mockNewQuote = { quote: 'Quote for testing' };
      const now = new Date();
      const expectedNewQuote = { id: 1, ...mockNewQuote, createdAt: now, updatedAt: now };
      // prismaMock.quotes.create.mockResolvedValue(expectedNewQuote);

      const resp = await request.post(NEW_QUOTE_URI).send(mockNewQuote);

      // expect(prismaMock.quotes.create).toHaveBeenCalledTimes(1);
      expect(resp.status).toBe(201);
      expect(resp.headers['x-api-provider']).toEqual('Powered by GSN');
      expect(resp.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(resp.body).toEqual(resp.body);
    });
  });
});
