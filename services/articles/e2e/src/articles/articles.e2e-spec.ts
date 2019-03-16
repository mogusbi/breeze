/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {ArticlesModule} from '../../../src/app/articles';

describe('Articles', (): void => {
  let app: INestApplication;
  // let id: string = null;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          ArticlesModule
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

  // describe('[GET] /articles', (): void => {});

  describe('[GET] /articles/:id', (): void => {
    it('should return a article', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/articles/38015b30-9194-4957-a3eb-00829c4d52c7');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/articles/38015b30-9194-4957-a3eb-00829c4d52c7').query({
        fields: 'article.title,article.content'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/articles/38015b30-9194-4957-a3eb-00829c4d52c7').query({
        fields: 'article.name'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if competition does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/articles/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  // describe('[POST] /articles', (): void => {});
  //
  // describe('[PATCH] /articles/:id', (): void => {});

  // describe('[DELETE] /articles/:id', (): void => {
  //   it('should delete a competition', async (): Promise<void> => {
  //     const {body, status}: supertest.Response = await request.delete(`/articles/${id}`);
  //
  //     expect(status).toEqual(204);
  //     expect(body).toEqual({});
  //   });
  //
  //   it('should return not found if competition does not exist', async (): Promise<void> => {
  //     const {body, status}: supertest.Response = await request.delete('/articles/88044266-a83a-4e10-b85b-e552790909a1');
  //
  //     expect(status).toEqual(404);
  //     expect(body).toEqual({
  //       error: 'Not Found',
  //       statusCode: 404
  //     });
  //   });
  // });
});
