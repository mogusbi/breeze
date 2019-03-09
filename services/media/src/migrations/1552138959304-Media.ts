/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MigrationInterface, QueryRunner} from 'typeorm';
import {Media} from '../app/media';

export class Media1552138959304 implements MigrationInterface {
  private values: Media[] = [
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 1',
      id: '6091a1e1-e25a-4362-b296-a7b5016ea2c6',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 2',
      id: '0870319a-e0f1-4619-ac68-95ac08dae2ad',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 3',
      id: '305a6d3d-3150-4a5d-84fe-08ca62567d7d',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 4',
      id: 'cfd0b8e5-ddc2-4558-bac6-d316a1044601',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 5',
      id: '19fe8f11-6c7f-482c-b8ee-cb0c1e07a9f2',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 6',
      id: '99391375-42e1-40fc-affa-3e62bb115043',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 7',
      id: '95fdc3a0-0852-4be3-838f-76e8ab0a39a4',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 8',
      id: 'bde936ee-04c6-4912-99e2-aef3135b1c71',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 9',
      id: '9981cd05-77f1-4c54-8c47-fdc74f77ba42',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 10',
      id: '3a8cc8b6-7080-4a6b-bb08-52822e08bf28',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 11',
      id: 'f5ed1aa8-313c-4afd-9978-f47d81b7d23c',
      updatedAt: '2019-02-09'
    }),
    Object.assign(new Media(), {
      copyright: null,
      createdAt: '2019-02-09',
      description: 'Image 12',
      id: '6c93a90f-1f28-4b60-81d2-041980cb38c8',
      updatedAt: '2019-02-09'
    })
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(Media)
      .whereInIds(this.values.map(({id}: Media): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(Media)
      .values(this.values)
      .execute();
  }
}
