/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Team} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class TeamSeed1542580866334 implements MigrationInterface {
  private table: string = 'team';
  private values: Team[] = [
    {
      createdAt: '2018-11-18',
      id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
      name: 'AFC Wimbledon',
      updatedAt: '2018-11-18'
    },
    {
      createdAt: '2018-11-18',
      id: '1412d281-06e0-488d-8795-b46ee26daa4e',
      name: 'Newcastle United',
      updatedAt: '2018-11-18'
    },
    {
      createdAt: '2018-11-18',
      id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
      name: 'FC Barcelona',
      updatedAt: '2018-11-18'
    },
    {
      createdAt: '2018-11-18',
      id: '19d7f679-43d4-4060-b19d-03b30127cf23',
      name: 'Manchester City',
      updatedAt: '2018-11-18'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(this.table)
      .whereInIds(this.values.map(({id}: Team): string => id))
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
