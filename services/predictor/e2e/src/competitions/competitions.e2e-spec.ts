/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {CompetitionsModule} from '../../../src/app/competitions';

describe('Competitions', (): void => {
  let app: INestApplication;
  let id: string = null;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          CompetitionsModule
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

  describe('[GET] /competitions', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions');

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
              name: 'Bundesliga',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
              name: 'Serie A',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
              name: 'UEFA Europa League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
              name: 'Football League 1',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
              name: 'UEFA Champions League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'a6543c15-966a-4d22-85df-edaa11561227',
              name: 'Premier League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
              name: 'UEFA Nations League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
              name: 'Football League Championship',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
              name: 'Football League 2',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
              name: 'Football League Cup',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'f0439c4f-206a-48ac-9ff7-db8bad77b8bf',
              name: 'La Liga',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'f8a6922f-a7ce-4722-9e67-e5521c219724',
              name: 'FA Cup',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'id,name'
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
              name: 'Bundesliga'
            },
            {
              id: 'f8a6922f-a7ce-4722-9e67-e5521c219724',
              name: 'FA Cup'
            },
            {
              id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
              name: 'Football League 1'
            },
            {
              id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
              name: 'Football League 2'
            },
            {
              id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
              name: 'Football League Championship'
            },
            {
              id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
              name: 'Football League Cup'
            },
            {
              id: 'f0439c4f-206a-48ac-9ff7-db8bad77b8bf',
              name: 'La Liga'
            },
            {
              id: 'a6543c15-966a-4d22-85df-edaa11561227',
              name: 'Premier League'
            },
            {
              id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
              name: 'Serie A'
            },
            {
              id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
              name: 'UEFA Champions League'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'id,name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
              name: 'UEFA Europa League'
            },
            {
              id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
              name: 'UEFA Nations League'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'id,name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'club'
        });

        expect(status).toEqual(400);
        expect(body).toEqual({
          error: 'Bad Request',
          message: 'club column was not found in the Competition entity.',
          statusCode: 400
        });
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
                name: 'Bundesliga',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'f8a6922f-a7ce-4722-9e67-e5521c219724',
                name: 'FA Cup',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
                name: 'Football League 1',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
                name: 'Football League 2',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
                name: 'Football League Championship',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
                name: 'Football League Cup',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'f0439c4f-206a-48ac-9ff7-db8bad77b8bf',
                name: 'La Liga',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'a6543c15-966a-4d22-85df-edaa11561227',
                name: 'Premier League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
                name: 'Serie A',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
                name: 'UEFA Champions League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
                name: 'UEFA Europa League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
                name: 'UEFA Nations League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 2,
            pages: 2,
            total: 12
          });
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toEqual({});
        });
      });

      describe('descending', (): void => {
        it('should list first page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
                name: 'UEFA Nations League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
                name: 'UEFA Europa League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
                name: 'UEFA Champions League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
                name: 'Serie A',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'a6543c15-966a-4d22-85df-edaa11561227',
                name: 'Premier League',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'f0439c4f-206a-48ac-9ff7-db8bad77b8bf',
                name: 'La Liga',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
                name: 'Football League Cup',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
                name: 'Football League Championship',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
                name: 'Football League 2',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
                name: 'Football League 1',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'f8a6922f-a7ce-4722-9e67-e5521c219724',
                name: 'FA Cup',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
                name: 'Bundesliga',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 2,
            pages: 2,
            total: 12
          });
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toEqual({});
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
              name: 'Bundesliga',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
              name: 'Serie A',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
              name: 'UEFA Europa League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
              name: 'Football League 1',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
              name: 'UEFA Champions League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 5,
          page: 1,
          pages: 3,
          total: 12
        });
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'a6543c15-966a-4d22-85df-edaa11561227',
              name: 'Premier League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
              name: 'UEFA Nations League',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
              name: 'Football League Championship',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
              name: 'Football League 2',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
              name: 'Football League Cup',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 5,
          page: 2,
          pages: 3,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });
  });

  describe('[GET] /competitions/:id', (): void => {
    it('should return a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e');

      expect(status).toEqual(200);
      expect(body).toEqual({
        createdAt: '2018-12-01T00:00:00.000Z',
        id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
        name: 'Football League 1',
        updatedAt: '2018-12-01T00:00:00.000Z'
      });
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e').query({
        fields: 'name'
      });

      expect(status).toEqual(200);
      expect(body).toEqual({
        name: 'Football League 1'
      });
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e').query({
        fields: 'club'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'club column was not found in the Competition entity.',
        statusCode: 400
      });
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });

  describe('[POST] /competitions', (): void => {
    it('should create a new competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/competitions').send({
        name: 'FIFA World Cup'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        createdAt: expect.any(String),
        id,
        name: 'FIFA World Cup',
        updatedAt: expect.any(String)
      });
    });

    it('should throw an error if a duplicate competition is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/competitions').send({
        name: 'FIFA World Cup'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: expect.any(String),
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'FIFA World Cup\'');
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/competitions').send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: [
          {
            children: [],
            constraints: {
              isString: 'name must be a string'
            },
            property: 'name',
            target: {
              name: 99
            },
            value: 99
          }
        ],
        statusCode: 400
      });
    });
  });

  describe('[PATCH] /competitions/:id', (): void => {
    it('should update a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 'FIFA Club World Cup'
      });

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should throw an error of a competition is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 'UEFA Nations League'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: expect.any(String),
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'UEFA Nations League\'');
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/competitions/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: 'FIFA Club World Cup'
      });

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: [
          {
            children: [],
            constraints: {
              isString: 'name must be a string'
            },
            property: 'name',
            target: {
              name: 99
            },
            value: 99
          }
        ],
        statusCode: 400
      });
    });
  });

  describe('[DELETE] /competitions/:id', (): void => {
    it('should delete a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/competitions/${id}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/competitions/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });
});
