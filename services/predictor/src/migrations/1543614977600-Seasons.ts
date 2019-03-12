/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Season} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Seasons1543614977600 implements MigrationInterface {
  private table: string = 'season';
  private values: Season[] = [
    {
      createdAt: '2018-12-01',
      id: 'a526739f-15ba-4ee4-b30f-188bd11078ed',
      name: '2016/17',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '81f81292-1e0c-4f94-94a0-d164466a62c2',
      name: '2017/18',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '913d0a60-b388-4101-b5cf-95167c4f35cb',
      name: '2018/19',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '2860e0d0-1ecf-47e3-82ce-0b3400eacd95',
      name: '2019/20',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '9527f678-47c1-4c14-8de7-4deb26172bde',
      name: '2020/21',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '4aac4f01-0545-4e32-b2cd-c78e7687239b',
      name: '2021/22',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '6342404f-08ea-448b-9c1c-8acdcd97acbf',
      name: '2022/23',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '1d89fd93-85f6-4f79-8d92-01cebedc35fc',
      name: '2023/24',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'eae9b1f4-bacd-4bff-ade6-5abe2bfa0ffb',
      name: '2024/25',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '309ef708-50b4-49b6-9689-538aaa9c1218',
      name: '2025/26',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '048c3964-5290-41da-a531-2d83c95eeb1a',
      name: '2026/27',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '5419df62-155b-42e2-9514-13ff488e75be',
      name: '2027/28',
      updatedAt: '2018-12-01'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(this.table)
      .whereInIds(this.values.map(({id}: Season): string => id))
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
