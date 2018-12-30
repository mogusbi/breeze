/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {SeasonsModule} from '../../../src/app/seasons';

describe('Seasons', (): void => {
  let app: INestApplication;
  let id: string = null;
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
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '048c3964-5290-41da-a531-2d83c95eeb1a',
              name: '2026/27',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
              name: '2023/24',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
              name: '2019/20',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '309ef708-50b4-49b6-9689-538aaa9c1218',
              name: '2025/26',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
              name: '2021/22',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '5419df62-155b-42e2-9514-13ff488e75be',
              name: '2027/28',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
              name: '2022/23',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
              name: '2017/18',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
              name: '2018/19',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '9527f678-47c1-4c14-8de7-4deb26172bde',
              name: '2020/21',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'a526739f-15ba-4ee4-b30f-188bd11078ed',
              name: '2016/17',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: 'eae9b1f4-bacd-4bff-ade6-5abe2bfa0ffb',
              name: '2024/25',
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
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name'
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: 'a526739f-15ba-4ee4-b30f-188bd11078ed',
              name: '2016/17'
            },
            {
              id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
              name: '2017/18'
            },
            {
              id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
              name: '2018/19'
            },
            {
              id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
              name: '2019/20'
            },
            {
              id: '9527f678-47c1-4c14-8de7-4deb26172bde',
              name: '2020/21'
            },
            {
              id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
              name: '2021/22'
            },
            {
              id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
              name: '2022/23'
            },
            {
              id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
              name: '2023/24'
            },
            {
              id: 'eae9b1f4-bacd-4bff-ade6-5abe2bfa0ffb',
              name: '2024/25'
            },
            {
              id: '309ef708-50b4-49b6-9689-538aaa9c1218',
              name: '2025/26'
            }
          ],
          limit: 10,
          page: 1,
          pages: 2,
          total: 12
        });
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              id: '048c3964-5290-41da-a531-2d83c95eeb1a',
              name: '2026/27'
            },
            {
              id: '5419df62-155b-42e2-9514-13ff488e75be',
              name: '2027/28'
            }
          ],
          limit: 10,
          page: 2,
          pages: 2,
          total: 12
        });
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'id,name',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          fields: 'club'
        });

        expect(status).toEqual(400);
        expect(body).toEqual({
          error: 'Bad Request',
          message: 'club column was not found in the Season entity.',
          statusCode: 400
        });
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'a526739f-15ba-4ee4-b30f-188bd11078ed',
                name: '2016/17',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
                name: '2017/18',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
                name: '2018/19',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
                name: '2019/20',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '9527f678-47c1-4c14-8de7-4deb26172bde',
                name: '2020/21',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
                name: '2021/22',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
                name: '2022/23',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
                name: '2023/24',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'eae9b1f4-bacd-4bff-ade6-5abe2bfa0ffb',
                name: '2024/25',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '309ef708-50b4-49b6-9689-538aaa9c1218',
                name: '2025/26',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '048c3964-5290-41da-a531-2d83c95eeb1a',
                name: '2026/27',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '5419df62-155b-42e2-9514-13ff488e75be',
                name: '2027/28',
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
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            page: 3,
            sort: 'name'
          });

          expect(status).toEqual(204);
          expect(body).toEqual({});
        });
      });

      describe('descending', (): void => {
        it('should list first page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            dir: 'desc',
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '5419df62-155b-42e2-9514-13ff488e75be',
                name: '2027/28',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '048c3964-5290-41da-a531-2d83c95eeb1a',
                name: '2026/27',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '309ef708-50b4-49b6-9689-538aaa9c1218',
                name: '2025/26',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'eae9b1f4-bacd-4bff-ade6-5abe2bfa0ffb',
                name: '2024/25',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
                name: '2023/24',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
                name: '2022/23',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
                name: '2021/22',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '9527f678-47c1-4c14-8de7-4deb26172bde',
                name: '2020/21',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
                name: '2019/20',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
                name: '2018/19',
                updatedAt: '2018-12-01T00:00:00.000Z'
              }
            ],
            limit: 10,
            page: 1,
            pages: 2,
            total: 12
          });
        });

        it('should list second page of seasons with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/seasons').query({
            dir: 'desc',
            page: 2,
            sort: 'name'
          });

          expect(status).toEqual(200);
          expect(body).toEqual({
            items: [
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
                name: '2017/18',
                updatedAt: '2018-12-01T00:00:00.000Z'
              },
              {
                createdAt: '2018-12-01T00:00:00.000Z',
                id: 'a526739f-15ba-4ee4-b30f-188bd11078ed',
                name: '2016/17',
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
          const {body, status}: supertest.Response = await request.get('/seasons').query({
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
      it('should list first page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '048c3964-5290-41da-a531-2d83c95eeb1a',
              name: '2026/27',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
              name: '2023/24',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
              name: '2019/20',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '309ef708-50b4-49b6-9689-538aaa9c1218',
              name: '2025/26',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
              name: '2021/22',
              updatedAt: '2018-12-01T00:00:00.000Z'
            }
          ],
          limit: 5,
          page: 1,
          pages: 3,
          total: 12
        });
      });

      it('should list second page of seasons with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toEqual({
          items: [
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '5419df62-155b-42e2-9514-13ff488e75be',
              name: '2027/28',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
              name: '2022/23',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
              name: '2017/18',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
              name: '2018/19',
              updatedAt: '2018-12-01T00:00:00.000Z'
            },
            {
              createdAt: '2018-12-01T00:00:00.000Z',
              id: '9527f678-47c1-4c14-8de7-4deb26172bde',
              name: '2020/21',
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
        const {body, status}: supertest.Response = await request.get('/seasons').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toEqual({});
      });
    });
  });

  describe('[GET] /seasons/:id', (): void => {
    it('should return a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc');

      expect(status).toEqual(200);
      expect(body).toEqual({
        createdAt: '2018-12-01T00:00:00.000Z',
        id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
        name: '2023/24',
        updatedAt: '2018-12-01T00:00:00.000Z'
      });
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc').query({
        fields: 'name'
      });

      expect(status).toEqual(200);
      expect(body).toEqual({
        name: '2023/24'
      });
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/1d89fd93-85f6-4f79-8d92-01cebedc35fc').query({
        fields: 'club'
      });

      expect(status).toEqual(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'club column was not found in the Season entity.',
        statusCode: 400
      });
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/seasons/70340225-c90a-4b9b-a979-2d16212acd16');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });

  describe('[POST] /seasons', (): void => {
    it('should create a new season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
        name: '2005/06'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toMatchObject({
        name: '2005/06'
      });
    });

    it('should throw an error if a duplicate season is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
        name: '2005/06'
      });

      expect(status).toEqual(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'2005/06\'');
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/seasons').send({
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

  describe('[PATCH] /seasons/:id', (): void => {
    it('should update a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
        name: '2010/11'
      });

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should throw an error of a season is updated with a duplicate name', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
        name: '2018/19'
      });

      expect(status).toEqual(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        statusCode: 400
      });
      expect(body.message).toContain('ER_DUP_ENTRY: Duplicate entry \'2018/19\'');
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch('/seasons/88044266-a83a-4e10-b85b-e552790909a1').send({
        name: '2014/15'
      });

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });

    // TODO: Work out why this is being converted to a string
    it.skip('should throw an error if name is not a string', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/seasons/${id}`).send({
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

  describe('[DELETE] /seasons/:id', (): void => {
    it('should delete a season', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/seasons/${id}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    it('should return not found if season does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/seasons/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toEqual({
        error: 'Not Found',
        statusCode: 404
      });
    });
  });
});
