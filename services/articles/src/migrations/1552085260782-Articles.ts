/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MigrationInterface, QueryRunner} from 'typeorm';
import {Article} from '../app/articles/shared';

export class Articles1552085260782 implements MigrationInterface {
  private table: string = 'article';
  private values: Article[] = [
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '5be1a8e6-9f6f-4d08-bb13-a15a2a41a96f',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'This is the first article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '38015b30-9194-4957-a3eb-00829c4d52c7',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Second article that has been created',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '6c39e3c1-85c5-4369-a10c-8af8b1bc7d3f',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Is this the third article? You bet!',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: 'You will not believe how this 4th article was created',
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '4f723333-cf25-49ef-94a3-53ca70f1a75d',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'This is the fourth article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '240fea11-c29b-4d07-9a51-7e4e98e03d1a',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Article 5',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '9bb0813b-72bc-472b-8560-9643cf24c76d',
      publishDate: '2019-02-08',
      teaser: null,
      title: '6: Churning out articles like nothing else',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '63524d08-43f3-4e19-8ccf-c2acddbb03a0',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Lucky article number 7',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: 'b817f5a1-8515-40b8-9f51-4b7ad8c89f42',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'I would 8 to make more mock articles',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: 'c60e3f28-98d1-4895-933c-0b8f3cfdca8c',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Is this a real article? Nein',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '0cf56eee-44ae-493d-85e8-6880e5a28258',
      publishDate: '2019-02-08',
      teaser: null,
      title: '10th article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '15af0060-12cf-491e-9a66-a79ba7fba0d8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '5eab71af-cbba-4acd-b9f9-8ba6d426be6e',
      publishDate: '2019-02-08',
      teaser: null,
      title: '11: Is this the last article?',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      authorId: '689f9220-9580-4dd8-bbed-fd0c94ffa537',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '48ac1659-5686-421a-9e8e-38e5cb3c6718',
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Twelve articles written for mock data',
      updatedAt: '2019-02-08'
    })
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(this.table)
      .whereInIds(this.values.map(({id}: Article): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(this.table)
      .values(this.values)
      .execute();
  }
}
