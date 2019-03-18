/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MediaSource} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class MediaSource1552163182669 implements MigrationInterface {
  private values: MediaSource[] = [
    Object.assign(new MediaSource(), {
      id: '4cfc5255-6a9f-472c-ba2f-e89945cf8ceb',
      name: 'thumbnail',
      parent: {
        id: '6091a1e1-e25a-4362-b296-a7b5016ea2c6'
      },
      path: 'https://via.placeholder.com/480x480/FFF/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'e9b3ccc3-0734-466e-a253-7b4f38b2cfa3',
      name: 'main',
      parent: {
        id: '6091a1e1-e25a-4362-b296-a7b5016ea2c6'
      },
      path: 'https://via.placeholder.com/1200x630/FFF/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'bed8685e-05e8-49d9-bf3c-5af3e988181c',
      name: 'thumbnail',
      parent: {
        id: '0870319a-e0f1-4619-ac68-95ac08dae2ad'
      },
      path: 'https://via.placeholder.com/480x480/EEE/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'aa165b97-3e66-4ab8-8386-738b1f4507ab',
      name: 'main',
      parent: {
        id: '0870319a-e0f1-4619-ac68-95ac08dae2ad'
      },
      path: 'https://via.placeholder.com/1200x630/EEE/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '01196caa-4c85-4082-b234-5ddc3daac03a',
      name: 'thumbnail',
      parent: {
        id: '305a6d3d-3150-4a5d-84fe-08ca62567d7d'
      },
      path: 'https://via.placeholder.com/480x480/DDD/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'cb615573-4971-4828-ab41-517780231850',
      name: 'main',
      parent: {
        id: '305a6d3d-3150-4a5d-84fe-08ca62567d7d'
      },
      path: 'https://via.placeholder.com/1200x630/DDD/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '43662f90-0e0b-4ce9-ba47-27a0cfcbd3fb',
      name: 'thumbnail',
      parent: {
        id: 'cfd0b8e5-ddc2-4558-bac6-d316a1044601'
      },
      path: 'https://via.placeholder.com/480x480/CCC/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'b4d4bff6-4956-4458-86a1-3c42bb4d5109',
      name: 'main',
      parent: {
        id: 'cfd0b8e5-ddc2-4558-bac6-d316a1044601'
      },
      path: 'https://via.placeholder.com/1200x630/CCC/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '17a67765-1da9-41c2-8a59-7c2a6f09006d',
      name: 'thumbnail',
      parent: {
        id: '19fe8f11-6c7f-482c-b8ee-cb0c1e07a9f2'
      },
      path: 'https://via.placeholder.com/480x480/BBB/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'b1c58f88-98cd-4fd7-a1cf-705c249bcb26',
      name: 'main',
      parent: {
        id: '19fe8f11-6c7f-482c-b8ee-cb0c1e07a9f2'
      },
      path: 'https://via.placeholder.com/1200x630/BBB/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '9bd8fbb0-0ab5-4f73-99f8-9a948a4b10aa',
      name: 'thumbnail',
      parent: {
        id: '99391375-42e1-40fc-affa-3e62bb115043'
      },
      path: 'https://via.placeholder.com/480x480/AAA/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'f4655ccf-9745-4179-86b2-3c59dc0a941b',
      name: 'main',
      parent: {
        id: '99391375-42e1-40fc-affa-3e62bb115043'
      },
      path: 'https://via.placeholder.com/1200x630/AAA/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'ee1883f6-224b-4144-adeb-9d743ac446aa',
      name: 'thumbnail',
      parent: {
        id: '95fdc3a0-0852-4be3-838f-76e8ab0a39a4'
      },
      path: 'https://via.placeholder.com/480x480/999/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '93386811-ba57-43a0-8fb1-9e17c6ff5411',
      name: 'main',
      parent: {
        id: '95fdc3a0-0852-4be3-838f-76e8ab0a39a4'
      },
      path: 'https://via.placeholder.com/1200x630/999/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'c373c4e5-9b53-4cc7-82e2-d0b9357b982b',
      name: 'thumbnail',
      parent: {
        id: 'bde936ee-04c6-4912-99e2-aef3135b1c71'
      },
      path: 'https://via.placeholder.com/480x480/888/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '94daaf29-96e0-4641-b930-c500e70aa20a',
      name: 'main',
      parent: {
        id: 'bde936ee-04c6-4912-99e2-aef3135b1c71'
      },
      path: 'https://via.placeholder.com/1200x630/888/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'b313e2f2-d085-43c8-9700-98f538cd1486',
      name: 'thumbnail',
      parent: {
        id: '9981cd05-77f1-4c54-8c47-fdc74f77ba42'
      },
      path: 'https://via.placeholder.com/480x480/777/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '25265dfb-9a82-4c55-b706-9902c8d22880',
      name: 'main',
      parent: {
        id: '9981cd05-77f1-4c54-8c47-fdc74f77ba42'
      },
      path: 'https://via.placeholder.com/1200x630/777/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '22ff995f-8e88-465b-8a56-872db240c365',
      name: 'thumbnail',
      parent: {
        id: '3a8cc8b6-7080-4a6b-bb08-52822e08bf28'
      },
      path: 'https://via.placeholder.com/480x480/666/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '1906e932-3071-4d46-a9b8-79d229ae9bc4',
      name: 'main',
      parent: {
        id: '3a8cc8b6-7080-4a6b-bb08-52822e08bf28'
      },
      path: 'https://via.placeholder.com/1200x630/666/000?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: '00117b67-e296-47ac-8676-27a519de373d',
      name: 'thumbnail',
      parent: {
        id: 'f5ed1aa8-313c-4afd-9978-f47d81b7d23c'
      },
      path: 'https://via.placeholder.com/480x480/555/FFF?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'dac73a4e-6fb6-4daa-8cb2-0b0b1b9ecb10',
      name: 'main',
      parent: {
        id: 'f5ed1aa8-313c-4afd-9978-f47d81b7d23c'
      },
      path: 'https://via.placeholder.com/1200x630/555/FFF?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'ab006301-766e-4009-b53b-d1659613f473',
      name: 'thumbnail',
      parent: {
        id: '6c93a90f-1f28-4b60-81d2-041980cb38c8'
      },
      path: 'https://via.placeholder.com/480x480/444/FFF?text=Placeholder'
    }),
    Object.assign(new MediaSource(), {
      id: 'efc510f3-e6f9-4bd1-ac7d-c6287aa84353',
      name: 'main',
      parent: {
        id: '6c93a90f-1f28-4b60-81d2-041980cb38c8'
      },
      path: 'https://via.placeholder.com/1200x630/444/FFF?text=Placeholder'
    })
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(MediaSource)
      .whereInIds(this.values.map(({id}: MediaSource): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(MediaSource)
      .values(this.values)
      .execute();
  }
}
