/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {TeamsModule} from '../../../src/app/teams';

describe('Teams', (): void => {
  let app: INestApplication;
  let id: string = null;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          TeamsModule
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

  describe('[GET] /teams', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams');

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
              name: 'Arsenal',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: '1412d281-06e0-488d-8795-b46ee26daa4e',
              name: 'Newcastle United',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: '19d7f679-43d4-4060-b19d-03b30127cf23',
              name: 'Manchester City',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '47362a27-5245-4492-ab5b-8a2df31eec93',
              name: 'Chelsea',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
              name: 'Everton',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
              name: 'Liverpool',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '97243d37-3330-46d3-96df-9513e35a8cc9',
              name: 'Manchester United',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
              name: 'FC Barcelona',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
              name: 'Tottenham Hotspur',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
              name: 'Watford',
              updatedAt: '2018-11-19T00:00:00.000Z'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
              name: 'Bournemouth',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
              name: 'AFC Wimbledon',
              updatedAt: '2018-11-18T00:00:00.000Z'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name'
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
              name: 'AFC Wimbledon'
            },
            {
              id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
              name: 'Arsenal'
            },
            {
              id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
              name: 'Bournemouth'
            },
            {
              id: '47362a27-5245-4492-ab5b-8a2df31eec93',
              name: 'Chelsea'
            },
            {
              id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
              name: 'Everton'
            },
            {
              id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
              name: 'FC Barcelona'
            },
            {
              id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
              name: 'Liverpool'
            },
            {
              id: '19d7f679-43d4-4060-b19d-03b30127cf23',
              name: 'Manchester City'
            },
            {
              id: '97243d37-3330-46d3-96df-9513e35a8cc9',
              name: 'Manchester United'
            },
            {
              id: '1412d281-06e0-488d-8795-b46ee26daa4e',
              name: 'Newcastle United'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
              name: 'Tottenham Hotspur'
            },
            {
              id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
              name: 'Watford'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'club'
        });

        expect(status).toEqual(400);
        expect(body).toEqual({
          error: 'Bad Request',
          message: 'club column was not found in the Team entity.',
          statusCode: 400
        });
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
                name: 'AFC Wimbledon',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
                name: 'Arsenal',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
                name: 'Bournemouth',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '47362a27-5245-4492-ab5b-8a2df31eec93',
                name: 'Chelsea',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
                name: 'Everton',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
                name: 'FC Barcelona',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
                name: 'Liverpool',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: '19d7f679-43d4-4060-b19d-03b30127cf23',
                name: 'Manchester City',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '97243d37-3330-46d3-96df-9513e35a8cc9',
                name: 'Manchester United',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: '1412d281-06e0-488d-8795-b46ee26daa4e',
                name: 'Newcastle United',
                updatedAt: '2018-11-18T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
                name: 'Tottenham Hotspur',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
                name: 'Watford',
                updatedAt: '2018-11-19T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 2,
            pages: 2,
            total: 12
          });
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toEqual({});
        });
      });

      describe('descending', (): void => {
        it('should list first page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            dir: 'desc',
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
                name: 'Watford',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
                name: 'Tottenham Hotspur',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: '1412d281-06e0-488d-8795-b46ee26daa4e',
                name: 'Newcastle United',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '97243d37-3330-46d3-96df-9513e35a8cc9',
                name: 'Manchester United',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: '19d7f679-43d4-4060-b19d-03b30127cf23',
                name: 'Manchester City',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
                name: 'Liverpool',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
                name: 'FC Barcelona',
                updatedAt: '2018-11-18T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
                name: 'Everton',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '47362a27-5245-4492-ab5b-8a2df31eec93',
                name: 'Chelsea',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
                name: 'Bournemouth',
                updatedAt: '2018-11-19T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            dir: 'desc',
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-11-19T00:00:00.000Z',
                id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
                name: 'Arsenal',
                updatedAt: '2018-11-19T00:00:00.000Z'
              },
              {
                createdAt: '2018-11-18T00:00:00.000Z',
                id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
                name: 'AFC Wimbledon',
                updatedAt: '2018-11-18T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 2,
            pages: 2,
            total: 12
          });
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
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
      it('should list first page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
              name: 'Arsenal',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: '1412d281-06e0-488d-8795-b46ee26daa4e',
              name: 'Newcastle United',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: '19d7f679-43d4-4060-b19d-03b30127cf23',
              name: 'Manchester City',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '47362a27-5245-4492-ab5b-8a2df31eec93',
              name: 'Chelsea',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
              name: 'Everton',
              updatedAt: '2018-11-19T00:00:00.000Z'
            }
          ],
          limit: 5,
          page: 1,
          pages: 3,
          total: 12
        });
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
              name: 'Liverpool',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: '97243d37-3330-46d3-96df-9513e35a8cc9',
              name: 'Manchester United',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-18T00:00:00.000Z',
              id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
              name: 'FC Barcelona',
              updatedAt: '2018-11-18T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
              name: 'Tottenham Hotspur',
              updatedAt: '2018-11-19T00:00:00.000Z'
            },
            {
              createdAt: '2018-11-19T00:00:00.000Z',
              id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
              name: 'Watford',
              updatedAt: '2018-11-19T00:00:00.000Z'
            }
          ],
          limit: 5,
          page: 2,
          pages: 3,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });
  });

  describe('[GET] /teams/:id', (): void => {
    it('should return a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d');

      expect(status).toEqual(200);
      expect(body).toEqual({
        createdAt: '2018-11-18T00:00:00.000Z',
        id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
        name: 'AFC Wimbledon',
        updatedAt: '2018-11-18T00:00:00.000Z'
      });
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d').query({
        fields: 'name'
      });

      expect(status).toEqual(200);
      expect(body).toEqual({
        name: 'AFC Wimbledon'
      });
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d').query({
        fields: 'club'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'club column was not found in the Team entity.',
        statusCode: 400
      });
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });

  describe('[POST] /teams', (): void => {
    it('should create a new team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/teams').send({
        name: 'Team'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        createdAt: expect.any(String),
        id,
        name: 'Team',
        updatedAt: expect.any(String)
      });
    });

    it('should throw an error if a duplicate team is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/teams').send({
        name: 'Team'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: expect.any(String),
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'Team\'');
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/teams').send({
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

  describe('[PATCH] /teams/:id', (): void => {
    it('should update a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
        name: 'Team rename'
      });

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should throw an error of a team is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
        name: 'AFC Wimbledon'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: expect.any(String),
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'AFC Wimbledon\'');
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/teams/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: 'Team rename'
      });

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
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

  describe('[DELETE] /teams/:id', (): void => {
    it('should delete a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/teams/${id}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/teams/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });
});
