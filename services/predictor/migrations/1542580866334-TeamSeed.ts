/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MigrationInterface, QueryRunner} from 'typeorm';
import {Team} from '../src/app/team';

export class TeamSeed1542580866334 implements MigrationInterface {
  private table: string = 'team';
  private values: Team[] = [
    {
      createdAt: new Date('11/18/2018'),
      id: 'f3ec4e4b-02bc-4c28-b9ca-ccc6b9f3553d',
      name: 'AFC Wimbledon',
      updatedAt: new Date('11/18/2018')
    },
    {
      createdAt: new Date('11/18/2018'),
      id: '1412d281-06e0-488d-8795-b46ee26daa4e',
      name: 'Newcastle United',
      updatedAt: new Date('11/18/2018')
    },
    {
      createdAt: new Date('11/18/2018'),
      id: 'bab0f5a9-d202-49f0-ad49-eb49c0d9b701',
      name: 'FC Barcelona',
      updatedAt: new Date('11/18/2018')
    },
    {
      createdAt: new Date('11/18/2018'),
      id: '19d7f679-43d4-4060-b19d-03b30127cf23',
      name: 'Manchester City',
      updatedAt: new Date('11/18/2018')
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
