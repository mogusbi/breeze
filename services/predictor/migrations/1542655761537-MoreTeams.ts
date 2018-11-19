/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MigrationInterface, QueryRunner} from 'typeorm';
import {Team} from '../src/app/team';

export class MoreTeams1542655761537 implements MigrationInterface {
  private table: string = 'team';
  private values: Team[] = [
    {
      createdAt: new Date('11/19/2018'),
      id: '6d07e93c-2c15-4de8-85b0-a3a2be741897',
      name: 'Liverpool',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: '47362a27-5245-4492-ab5b-8a2df31eec93',
      name: 'Chelsea',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: 'cefc7f1b-65ae-44d1-b0a8-79c20b551f41',
      name: 'Tottenham Hotspur',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: '07c3eac0-909d-4a1c-9fb5-6a6202c65e34',
      name: 'Arsenal',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: 'ebdcacdb-cdd8-4817-b87b-412c3e83ecc0',
      name: 'Bournemouth',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: 'e5f9f49c-bf0e-4505-8b3a-030ae3e5d968',
      name: 'Watford',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: '97243d37-3330-46d3-96df-9513e35a8cc9',
      name: 'Manchester United',
      updatedAt: new Date('11/19/2018')
    },
    {
      createdAt: new Date('11/19/2018'),
      id: '5ff6312e-59d5-462f-bf5e-094834b55e96',
      name: 'Everton',
      updatedAt: new Date('11/19/2018')
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
