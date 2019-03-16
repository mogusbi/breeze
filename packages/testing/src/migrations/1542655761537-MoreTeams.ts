/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Team} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class MoreTeams1542655761537 implements MigrationInterface {
  private values: Team[] = [
    {
      createdAt: '2018-11-19',
      id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
      name: 'Liverpool',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: '47362a27-5245-4492-ab5b-8a2df31eec93',
      name: 'Chelsea',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
      name: 'Tottenham Hotspur',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
      name: 'Arsenal',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
      name: 'Bournemouth',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
      name: 'Watford',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: '97243d37-3330-46d3-96df-9513e35a8cc9',
      name: 'Manchester United',
      updatedAt: '2018-11-19'
    },
    {
      createdAt: '2018-11-19',
      id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
      name: 'Everton',
      updatedAt: '2018-11-19'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(Team)
      .whereInIds(this.values.map(({id}: Team): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values(this.values)
      .execute();
  }
}
