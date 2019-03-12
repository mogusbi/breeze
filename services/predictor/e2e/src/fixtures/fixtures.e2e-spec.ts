/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {FixturesModule} from '../../../src/app/fixtures';

describe('Fixtures', (): void => {
  let app: INestApplication;
  let id: string;
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

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    request = supertest(app.getHttpServer());
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  describe('[GET] /fixtures', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures');

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'fixture.id,fixture.awayScore,fixture.homeScore'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'fixture.id,fixture.awayScore,fixture.homeScore',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'fixture.id,fixture.awayScore,fixture.homeScore',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'fixture.id,fixture.name',
          page: 3
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    // TODO: Await TypeORM fix for join filtering
    describe.skip('with filtering on joins', (): void => {
      it('should list first page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'fixture.id,home.name,fixture.homeScore,away.name,fixture.awayScore'
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              away: {
                name: 'Newcastle United'
              },
              awayScore: null,
              home: {
                name: 'Bournemouth'
              },
              homeScore: null,
              id: '04c78776-7f77-4fb2-ba29-7cd9f641a50b'
            },
            {
              away: {
                name: 'Chelsea'
              },
              awayScore: 1,
              home: {
                name: 'Tottenham Hotspur'
              },
              homeScore: 3,
              id: '08a4387f-1cf9-47eb-a577-22ee2c3b2f17'
            },
            {
              away: {
                name: 'Arsenal'
              },
              awayScore: null,
              home: {
                name: 'Manchester United'
              },
              homeScore: null,
              id: '4e0ce8a4-1053-43a4-ae48-ecfbb6bc79f1'
            },
            {
              away: {
                name: 'Newcastle United'
              },
              awayScore: null,
              home: {
                name: 'Everton'
              },
              homeScore: null,
              id: '5cea0599-c9bd-4063-81f2-697e0bcc5c4a'
            },
            {
              away: {
                name: 'Manchester City'
              },
              awayScore: null,
              date: '2019-03-16T15:00:00.000Z',
              home: {
                name: 'Manchester United'
              },
              homeScore: null,
              id: '67d2e593-4c29-479c-ba9a-56bfeb5e1ebb'
            },
            {
              away: {
                name: 'Bournemouth'
              },
              awayScore: null,
              home: {
                name: 'Manchester City'
              },
              homeScore: null,
              id: '8c271376-e2c9-4c15-9ca1-60e469a18359'
            },
            {
              away: {
                name: 'Arsenal'
              },
              awayScore: 2,
              home: {
                name: 'Bournemouth'
              },
              homeScore: 1,
              id: 'a32e5fa2-1bf1-4188-86d7-50d74cfea6b9'
            },
            {
              away: {
                name: 'Manchester United'
              },
              awayScore: null,
              home: {
                name: 'Tottenham Hotspur'
              },
              homeScore: null,
              id: 'ce41219d-d6e4-43f8-8b82-0f3d0e36f304'
            },
            {
              away: {
                name: 'Liverpool'
              },
              awayScore: 3,
              home: {
                name: 'Watford'
              },
              homeScore: 0,
              id: 'ea72f2be-ef7e-4fae-99be-02222e968f5d'
            },
            {
              away: {
                name: 'Everton'
              },
              awayScore: null,
              home: {
                name: 'Liverpool'
              },
              homeScore: null,
              id: 'eeea1164-37a8-49c0-8d08-6025a80c2788'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'id,home.name,homeScore,away.name,awayScore',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              away: {
                name: 'Manchester City'
              },
              awayScore: null,
              home: {
                name: 'Watford'
              },
              homeScore: null,
              id: 'f7621600-3f00-48e3-868c-dfe3115b30ee'
            },
            {
              away: {
                name: 'Everton'
              },
              awayScore: 0,
              home: {
                name: 'Chelsea'
              },
              homeScore: 0,
              id: 'fc1e3fdd-9bf0-4ecc-bf06-988feb248e3b'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'id,home.name,homeScore,away.name,awayScore',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          fields: 'id,home.location',
          page: 3
        });

        expect(status).toEqual(400);
        expect(body).toEqual({
          error: 'Bad Request',
          message: 'location column was not found in the Team entity.',
          statusCode: 400
        });
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of fixtures with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            sort: 'fixture.date'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of fixtures with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            page: 2,
            sort: 'fixture.date'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            page: 3,
            sort: 'fixture.date'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of fixtures with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            dir: 'desc',
            sort: 'fixture.date'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of fixtures with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            dir: 'desc',
            page: 2,
            sort: 'fixture.date'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/fixtures').query({
            dir: 'desc',
            page: 3,
            sort: 'fixture.date'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of fixtures with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/fixtures').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /fixtures/:id', (): void => {
    it('should return a fixture', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9').query({
        fields: 'fixture.id,fixture.homeScore,fixture.awayScore'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result on join', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9').query({
        fields: 'fixture.id,home.name,fixture.homeScore,away.name,fixture.awayScore'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b9').query({
        fields: 'fixture.id,fixture.aggregate'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/fixtures/a32e5fa2-1bf1-4188-86d7-50d74cfea6b8');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[POST] /fixtures', (): void => {
    it('should create a new fixture', async (): Promise<void> => {
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

  describe('[PATCH] /fixtures', (): void => {
    it('should update a fixture', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/fixtures/${id}`).send({
        away: '97243d37-3330-46d3-96df-9513e35a8cc9',
        awayScore: 1,
        competition: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
        date: '2019-07-01T20:00:00',
        home: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
        homeScore: 2,
        season: '913d0a60-b388-4101-b5cf-95167c4f35cb'
      });

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/fixtures/88044266-a83a-4e10-b85b-e552790909a1').send({
        away: '97243d37-3330-46d3-96df-9513e35a8cc9',
        awayScore: 1,
        competition: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
        date: '2019-07-01T20:00:00',
        home: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
        homeScore: 2,
        season: '913d0a60-b388-4101-b5cf-95167c4f35cb'
      });

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /fixtures/:id', (): void => {
    it('should delete a fixture', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/fixtures/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/fixtures/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
