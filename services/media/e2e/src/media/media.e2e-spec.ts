/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as supertest from 'supertest';
import {MediaModule} from '../../../src/app/media';

describe('Media', (): void => {
  let app: INestApplication;
  let id: string;
  let request: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          MediaModule
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

  describe('[GET] /media', (): void => {
    describe('with no filtering or sorting', (): void => {
      it('should list first page of media with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media');

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of media with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with filtering', (): void => {
      it('should list first page of media with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'media.id,media.description'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of media with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'media.id,media.description',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'media.id,media.description',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'media.id,media.name'
        });

        expect(status).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    // TODO: Await TypeORM fix for join filtering
    describe.skip('with filtering on joins', (): void => {
      it('should list first page of media with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'id,source'
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of media with selected values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'id,source',
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          fields: 'id,source',
          page: 3
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with sorting', (): void => {
      describe('ascending', (): void => {
        it('should list first page of media with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'asc',
            sort: 'media.description'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of media with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'asc',
            page: 2,
            sort: 'media.description'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'asc',
            page: 3,
            sort: 'media.description'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });

      describe('descending', (): void => {
        it('should list first page of media with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'desc',
            sort: 'media.description'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should list second page of media with all values', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'desc',
            page: 2,
            sort: 'media.description'
          });

          expect(status).toEqual(200);
          expect(body).toMatchSnapshot();
        });

        it('should return no content if out of bounds', async (): Promise<void> => {
          const {body, status}: supertest.Response = await request.get('/media').query({
            dir: 'desc',
            page: 3,
            sort: 'media.description'
          });

          expect(status).toEqual(204);
          expect(body).toMatchSnapshot();
        });
      });
    });

    describe('with limiting', (): void => {
      it('should list first page of media with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          limit: 5
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should list second page of media with all values', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          limit: 5,
          page: 2
        });

        expect(status).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('should return no content if out of bounds', async (): Promise<void> => {
        const {body, status}: supertest.Response = await request.get('/media').query({
          limit: 5,
          page: 4
        });

        expect(status).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('[GET] /media/:id', (): void => {
    it('should return media item', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/media/cfd0b8e5-ddc2-4558-bac6-d316a1044601');

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a filtered result', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/media/cfd0b8e5-ddc2-4558-bac6-d316a1044601').query({
        fields: 'media.id,media.description'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    // TODO: Await TypeORM fix for join filtering
    it.skip('should return a filtered result on join', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/media/cfd0b8e5-ddc2-4558-bac6-d316a1044601').query({
        fields: 'media.id,media.source'
      });

      expect(status).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('should return a bad request if filtered field does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/media/cfd0b8e5-ddc2-4558-bac6-d316a1044601').query({
        fields: 'media.id,media.name'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if fixture does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.get('/media/cfd0b8e5-ddc2-4558-bac6-d316a104460a');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[POST] /media', (): void => {
    it('should create a new media item', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/large.jpg'
          }
        ]
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toEqual({
        copyright: null,
        createdAt: expect.any(String),
        description: 'Description',
        id: expect.any(String),
        source: [
          {
            id: expect.any(String),
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/thumbnail.jpg'
          },
          {
            id: expect.any(String),
            name: 'large',
            path: 'https://www.website.com/path/to/large.jpg'
          }
        ],
        updatedAt: expect.any(String)
      });
    });

    it('should throw an error if a duplicate media item is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: 'Description'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/another/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ],
        source: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/another/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a nested required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a nested field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.post('/media').send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: [
              'https://www.website.com/path/to/another/thumbnail.jpg'
            ]
          },
          {
            name: 'large',
            path: 'path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[PATCH] /media/:id', (): void => {
    // TODO: Need to fix this
    it.skip('should update media item', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/updated/path/to/thumbnail.jpg'
          }
        ]
      });

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });

    // TODO: Need to fix this
    it.skip('should throw an error if a duplicate media item is created', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: 'https://via.placeholder.com/480x380/555/FFF?text=Placeholder'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toEqual({});
    });

    it('should throw an error if a required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: 'Description'
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/another/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ],
        source: [
          {
            name: 'thumbnail',
            path: 'https://www.website.com/path/to/another/thumbnail.jpg'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a nested required field is missing', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail'
          },
          {
            name: 'large',
            path: 'https://www.website.com/path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('should throw an error if a nested field is the wrong format', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.patch(`/media/${id}`).send({
        description: 'Description',
        source: [
          {
            name: 'thumbnail',
            path: [
              'https://www.website.com/path/to/another/thumbnail.jpg'
            ]
          },
          {
            name: 'large',
            path: 'path/to/another/large.jpg'
          }
        ]
      });

      expect(status).toEqual(400);
      expect(body).toMatchSnapshot();
    });
  });

  describe('[DELETE] /media/:id', (): void => {
    it('should delete media', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete(`/media/${id}`);

      expect(status).toEqual(204);
      expect(body).toMatchSnapshot();
    });

    it('should return not found if media does not exist', async (): Promise<void> => {
      const {body, status}: supertest.Response = await request.delete('/media/88044266-a83a-4e10-b85b-e552790909a1');

      expect(status).toEqual(404);
      expect(body).toMatchSnapshot();
    });
  });
});
