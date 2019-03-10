/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {SeasonsModule} from '../../../src/app/seasons';

describe('Seasons', (): void => {
  let app: INestApplication;
  let id: string;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          SeasonsModule
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

  describe('[GET] /seasons', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons');

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'club'
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            dir: 'desc',
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            dir: 'desc',
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
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
      it('should list first page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /seasons/:id', (): void => {
    it('should return a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc').query({
        fields: 'name'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc').query({
        fields: 'club'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[POST] /seasons', (): void => {
    it('should create a new season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
        name: '2005/06'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        createdAt: expect.any(String),
        id,
        name: '2005/06',
        updatedAt: expect.any(String)
      });
    });

    it('should throw an error if a duplicate season is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
        name: '2005/06'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[PATCH] /seasons/:id', (): void => {
    it('should update a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
        name: '2010/11'
      });

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error of a season is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
        name: '2018/19'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/seasons/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: '2014/15'
      });

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /seasons/:id', (): void => {
    it('should delete a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/seasons/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/seasons/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
