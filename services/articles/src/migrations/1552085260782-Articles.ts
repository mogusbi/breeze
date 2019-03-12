/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Article} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Articles1552085260782 implements MigrationInterface {
  private table: string = 'article';
  private values: Article[] = [
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '5be1a8e6-9f6f-4d08-bb13-a15a2a41a96f',
      media: {
        id: '6c93a90f-1f28-4b60-81d2-041980cb38c8'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'This is the first article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '38015b30-9194-4957-a3eb-00829c4d52c7',
      media: {
        id: 'f5ed1aa8-313c-4afd-9978-f47d81b7d23c'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Second article that has been created',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '6c39e3c1-85c5-4369-a10c-8af8b1bc7d3f',
      media: {
        id: '95fdc3a0-0852-4be3-838f-76e8ab0a39a4'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Is this the third article? You bet!',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: 'You will not believe how this 4th article was created',
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '4f723333-cf25-49ef-94a3-53ca70f1a75d',
      media: {
        id: '3a8cc8b6-7080-4a6b-bb08-52822e08bf28'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'This is the fourth article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '240fea11-c29b-4d07-9a51-7e4e98e03d1a',
      media: {
        id: '9981cd05-77f1-4c54-8c47-fdc74f77ba42'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Article 5',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '9bb0813b-72bc-472b-8560-9643cf24c76d',
      media: {
        id: 'bde936ee-04c6-4912-99e2-aef3135b1c71'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: '6: Churning out articles like nothing else',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '63524d08-43f3-4e19-8ccf-c2acddbb03a0',
      media: {
        id: '99391375-42e1-40fc-affa-3e62bb115043'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Lucky article number 7',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: 'b817f5a1-8515-40b8-9f51-4b7ad8c89f42',
      media: {
        id: '19fe8f11-6c7f-482c-b8ee-cb0c1e07a9f2'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'I would 8 to make more mock articles',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: 'c60e3f28-98d1-4895-933c-0b8f3cfdca8c',
      media: {
        id: 'cfd0b8e5-ddc2-4558-bac6-d316a1044601'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: 'Is this a real article? Nein',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '0cf56eee-44ae-493d-85e8-6880e5a28258',
      media: {
        id: '305a6d3d-3150-4a5d-84fe-08ca62567d7d'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: '10th article',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: '98dc24a5-4f9a-4013-8124-3843ad1278d2'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '5eab71af-cbba-4acd-b9f9-8ba6d426be6e',
      media: {
        id: '0870319a-e0f1-4619-ac68-95ac08dae2ad'
      },
      publishDate: '2019-02-08',
      teaser: null,
      title: '11: Is this the last article?',
      updatedAt: '2019-02-08'
    }),
    Object.assign(new Article(), {
      alternativeTitle: null,
      author: {
        id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4'
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla venenatis urna ut fringilla.',
      createdAt: '2019-02-08',
      id: '48ac1659-5686-421a-9e8e-38e5cb3c6718',
      media: {
        id: '6091a1e1-e25a-4362-b296-a7b5016ea2c6'
      },
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
