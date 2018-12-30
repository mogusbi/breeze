/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition} from '@breeze/competition';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Competitions1543680216224 implements MigrationInterface {
  private table: string = 'competition';
  private values: Competition[] = [
    {
      createdAt: '2018-12-01',
      id: 'a6543c15-966a-4d22-85df-edaa11561227',
      name: 'Premier League',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'c3631875-bad7-4f96-9349-712a89c87f7b',
      name: 'Football League Championship',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '66706c18-4daa-49eb-a857-df12b8e98a8e',
      name: 'Football League 1',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'ceedef18-0344-40ac-994d-748d963b9fc2',
      name: 'Football League 2',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'f0439c4f-206a-48ac-9ff7-db8bad77b8bf',
      name: 'La Liga',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '3ae6575c-5857-4f5f-a781-7a0cfba6c2a4',
      name: 'Bundesliga',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '3c15960b-c2c7-4719-b5bc-19396d33269e',
      name: 'Serie A',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '9463a53e-61cd-4521-8390-3dfd5dcd5fa4',
      name: 'UEFA Champions League',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: '5a9e34ef-eae6-417f-b577-0e359eeeeb30',
      name: 'UEFA Europa League',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'f8a6922f-a7ce-4722-9e67-e5521c219724',
      name: 'FA Cup',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'ed530b00-c9fa-49f2-be90-945fc7ca5eca',
      name: 'Football League Cup',
      updatedAt: '2018-12-01'
    },
    {
      createdAt: '2018-12-01',
      id: 'ab48a3c7-befd-4411-9ac4-0bd5116ecd99',
      name: 'UEFA Nations League',
      updatedAt: '2018-12-01'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(this.table)
      .whereInIds(this.values.map(({id}: Competition): string => id))
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
