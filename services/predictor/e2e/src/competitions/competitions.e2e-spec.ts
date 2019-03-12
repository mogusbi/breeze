/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {CompetitionsModule} from '../../../src/app/competitions';

describe('Competitions', (): void => {
  let app: INestApplication;
  let id: string;
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

    app.useGlobalPipes(new ValidationPipe());

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
        expect(body).toMatchSnapshot();
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'competition.id,competition.name'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'competition.id,competition.name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'competition.id,competition.name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          fields: 'competition.club'
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            sort: 'competition.name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            page: 2,
            sort: 'competition.name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            page: 3,
            sort: 'competition.name'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            sort: 'competition.name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of competitions with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            page: 2,
            sort: 'competition.name'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/competitions').query({
            dir: 'desc',
            page: 3,
            sort: 'competition.name'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of competitions with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/competitions').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /competitions/:id', (): void => {
    it('should return a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e').query({
        fields: 'competition.name'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/66706c18-4daa-49eb-a857-df12b8e98a8e').query({
        fields: 'competition.club'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/competitions/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
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
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/competitions').send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[PATCH] /competitions/:id', (): void => {
    it('should update a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 'FIFA Club World Cup'
      });

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error of a competition is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 'UEFA Nations League'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/competitions/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: 'FIFA Club World Cup'
      });

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/competitions/${id}`).send({
        name: 99
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /competitions/:id', (): void => {
    it('should delete a competition', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/competitions/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/competitions/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
