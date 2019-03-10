/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {TeamsModule} from '../../../src/app/teams';

describe('Teams', (): void => {
  let app: INestApplication;
  let id: string;
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

    app.useGlobalPipes(new ValidationPipe());

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
        expect(body).toMatchSnapshot();
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'id,name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          fields: 'club'
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            dir: 'desc',
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of teams with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            dir: 'desc',
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/teams').query({
            dir: 'desc',
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of teams with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/teams').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /teams/:id', (): void => {
    it('should return a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d').query({
        fields: 'name'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d').query({
        fields: 'club'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/teams/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
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
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/teams').send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[PATCH] /teams/:id', (): void => {
    it('should update a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
        name: 'Team rename'
      });

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error of a team is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
        name: 'AFC Wimbledon'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/teams/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: 'Team rename'
      });

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/teams/${id}`).send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /teams/:id', (): void => {
    it('should delete a team', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/teams/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if team does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/teams/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
