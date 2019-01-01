/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {FixturesModule} from '../../../src/app/fixtures';

describe('Fixtures', (): void => {
  let app: INestApplication;
  let id: string = null;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          FixturesModule
        ]
      })
      .compile();

    app = testModule.createNestApplication();

    await app.init();

    request = supertest(app.getHttpServer());
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  // TODO: [GET] /fixtures

  describe('[GET] /fixtures/:id', (): void => {
    it('should return a fixture', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9');

      expect(status).toEqual(200);
      expect(body).toEqual({
        away: {
          createdAt: '2018-11-19T00:00:00.000Z',
          id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
          name: 'Arsenal',
          updatedAt: '2018-11-19T00:00:00.000Z'
        },
        awayScore: 2,
        competition: {
          createdAt: '2018-12-01T00:00:00.000Z',
          id: 'a6543c15-966a-4d22-85df-edaa11561227',
          name: 'Premier League',
          updatedAt: '2018-12-01T00:00:00.000Z'
        },
        createdAt: '2018-11-30T00:00:00.000Z',
        date: '2018-11-25T13:30:00.000Z',
        home: {
          createdAt: '2018-11-19T00:00:00.000Z',
          id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
          name: 'Bournemouth',
          updatedAt: '2018-11-19T00:00:00.000Z'
        },
        homeScore: 1,
        id: 'a32e5fa2-1bf1-4188-86d7-50d74cfea6b9',
        season: {
          createdAt: '2018-12-01T00:00:00.000Z',
          id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
          name: '2018/19',
          updatedAt: '2018-12-01T00:00:00.000Z'
        },
        updatedAt: '2018-11-30T00:00:00.000Z'
      });
    });

    // TODO: Await TypeORM fix for join filtering
    it.skip('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9').query({
        fields: 'id,home.name,homeScore,away.name,awayScore'
      });

      expect(status).toEqual(200);
      expect(body).toEqual({
        away: {
          name: 'Arsenal'
        },
        awayScore: 2,
        home: {
          name: 'Bournemouth'
        },
        homeScore: 1,
        id: 'a32e5fa2-1bf1-4188-86d7-50d74cfea6b9'
      });
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9').query({
        fields: 'id,aggregate'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'aggregate column was not found in the Fixture entity.',
        statusCode: 400
      });
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b8');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });

  describe('[POST] /fixtures', (): void => {
    it('should create a new competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/fixtures').send({
        away: '97243d37-3330-46d3-96df-9513e35a8cc9',
        competition: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
        date: '2019-07-01T20:00:00',
        home: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
        season: '913d0a60-b388-4101-b5cf-95167c4f35cb'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        away: {
          id: '97243d37-3330-46d3-96df-9513e35a8cc9'
        },
        awayScore: null,
        competition: {
          id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4'
        },
        createdAt: expect.any(String),
        date: '2019-07-01T20:00:00',
        home: {
          id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701'
        },
        homeScore: null,
        id,
        season: {
          id: '913d0a60-b388-4101-b5cf-95167c4f35cb'
        },
        updatedAt: expect.any(String)
      });
    });
  });

  // TODO: [PATCH] /fixtures

  describe('[DELETE] /fixtures/:id', (): void => {
    it('should delete a fixture', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/fixtures/${id}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/fixtures/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });
});
