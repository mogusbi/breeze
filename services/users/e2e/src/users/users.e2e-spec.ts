/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {UsersModule} from '../../../src/app/users';

describe('Users', (): void => {
  let app: INestApplication;
  let id: string;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          UsersModule
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

  describe('[GET] /users', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of users with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users');

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of users with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of users with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          fields: 'user.id,user.forename,user.surname'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of users with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          fields: 'user.id,user.forename,user.surname',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          fields: 'user.id,user.forename,user.surname',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          fields: 'user.id,user.name,user.surname'
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of users with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'asc',
            sort: 'surname'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of users with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'asc',
            page: 2,
            sort: 'surname'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'asc',
            page: 3,
            sort: 'surname'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of users with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'desc',
            sort: 'surname'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of users with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'desc',
            page: 2,
            sort: 'surname'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/users').query({
            dir: 'desc',
            page: 3,
            sort: 'surname'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of users with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of users with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/users').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /users/:id', (): void => {
    it('should return user', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/users/f07a1ccb-f3bf-4ac8-beab-c740668674c4');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/users/f07a1ccb-f3bf-4ac8-beab-c740668674c4').query({
        fields: 'user.id,user.emailAddress'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/users/f07a1ccb-f3bf-4ac8-beab-c740668674c4').query({
        fields: 'user.id,user.name'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if user does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/users/f07a1ccb-f3bf-4ac8-beab-c740668674c9');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[POST] /users', (): void => {
    it('should create a new user', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/users').send({
        emailAddress: 'test@example.com',
        forename: 'Test',
        surname: 'Example'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        createdAt: expect.any(String),
        emailAddress: 'test@example.com',
        forename: 'Test',
        id: expect.any(String),
        surname: 'Example',
        updatedAt: expect.any(String)
      });
    });

    it('should throw an error if a duplicate user is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/users').send({
        emailAddress: 'test@example.com',
        forename: 'Duplicate',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/users').send({
        forename: 'Duplicate',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/users').send({
        emailAddress: 'test[AT]example.com',
        forename: 'Duplicate',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[PATCH] /users/:id', (): void => {
    it('should update a user', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/users/${id}`).send({
        emailAddress: 'updated@example.com',
        forename: 'Updated',
        surname: 'Example'
      });

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a duplicate user is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/users/${id}`).send({
        emailAddress: 'me@mogusbi.co.uk',
        forename: 'Test',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/users/${id}`).send({
        forename: 'Duplicate',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/users/${id}`).send({
        emailAddress: 'test[AT]example.com',
        forename: 'Duplicate',
        surname: 'User'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /users', (): void => {
    it('should delete user', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/users/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if user does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/users/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
