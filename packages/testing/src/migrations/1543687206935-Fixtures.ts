/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition, Fixture, Season, Team} from '@breezejs/sql';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Fixtures1543687206935 implements MigrationInterface {
  private values: Fixture[] = [
    {
      away: this.team('07c3eac0-909d-4a1c-9fb5-6a6202c65e34'),
      awayScore: 2,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-11-25T13:30:00',
      home: this.team('ebdcacdb-cdd8-4817-b87b-412c3e83ecc0'),
      homeScore: 1,
      id: 'a32e5fa2-1bf1-4188-86d7-50d74cfea6b9',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('6d07e93c-2c15-4de8-85b0-a3a2be741897'),
      awayScore: 3,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-11-24T15:00:00',
      home: this.team('e5f9f49c-bf0e-4505-8b3a-030ae3e5d968'),
      homeScore: 0,
      id: 'ea72f2be-ef7e-4fae-99be-02222e968f5d',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('47362a27-5245-4492-ab5b-8a2df31eec93'),
      awayScore: 1,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-11-24T17:30:00',
      home: this.team('cefc7f1b-65ae-44d1-b0a8-79c20b551f41'),
      homeScore: 3,
      id: '08a4387f-1cf9-47eb-a577-22ee2c3b2f17',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('07c3eac0-909d-4a1c-9fb5-6a6202c65e34'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-12-05T20:00:00',
      home: this.team('97243d37-3330-46d3-96df-9513e35a8cc9'),
      homeScore: null,
      id: '4e0ce8a4-1053-43a4-ae48-ecfbb6bc79f1',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('5ff6312e-59d5-462f-bf5e-094834b55e96'),
      awayScore: 0,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-11-11T14:15:00',
      home: this.team('47362a27-5245-4492-ab5b-8a2df31eec93'),
      homeScore: 0,
      id: 'fc1e3fdd-9bf0-4ecc-bf06-988feb248e3b',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('1412d281-06e0-488d-8795-b46ee26daa4e'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-12-05T19:45:00',
      home: this.team('5ff6312e-59d5-462f-bf5e-094834b55e96'),
      homeScore: null,
      id: '5cea0599-c9bd-4063-81f2-697e0bcc5c4a',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('ebdcacdb-cdd8-4817-b87b-412c3e83ecc0'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-12-01T15:00:00',
      home: this.team('19d7f679-43d4-4060-b19d-03b30127cf23'),
      homeScore: null,
      id: '8c271376-e2c9-4c15-9ca1-60e469a18359',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('19d7f679-43d4-4060-b19d-03b30127cf23'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-12-04T20:00:00',
      home: this.team('e5f9f49c-bf0e-4505-8b3a-030ae3e5d968'),
      homeScore: null,
      id: 'f7621600-3f00-48e3-868c-dfe3115b30ee',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('1412d281-06e0-488d-8795-b46ee26daa4e'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2019-03-16T15:00:00',
      home: this.team('ebdcacdb-cdd8-4817-b87b-412c3e83ecc0'),
      homeScore: null,
      id: '04c78776-7f77-4fb2-ba29-7cd9f641a50b',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('5ff6312e-59d5-462f-bf5e-094834b55e96'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2018-12-02T16:15:00',
      home: this.team('6d07e93c-2c15-4de8-85b0-a3a2be741897'),
      homeScore: null,
      id: 'eeea1164-37a8-49c0-8d08-6025a80c2788',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('97243d37-3330-46d3-96df-9513e35a8cc9'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2019-01-13T16:30:00',
      home: this.team('cefc7f1b-65ae-44d1-b0a8-79c20b551f41'),
      homeScore: null,
      id: 'ce41219d-d6e4-43f8-8b82-0f3d0e36f304',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    },
    {
      away: this.team('19d7f679-43d4-4060-b19d-03b30127cf23'),
      awayScore: null,
      competition: this.competition('a6543c15-966a-4d22-85df-edaa11561227'),
      createdAt: '2018-11-30',
      date: '2019-03-16T15:00:00',
      home: this.team('97243d37-3330-46d3-96df-9513e35a8cc9'),
      homeScore: null,
      id: '67d2e593-4c29-479c-ba9a-56bfeb5e1ebb',
      season: this.season('913d0a60-b388-4101-b5cf-95167c4f35cb'),
      updatedAt: '2018-11-30'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(Fixture)
      .whereInIds(this.values.map(({id}: Fixture): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(Fixture)
      .values(this.values)
      .execute();
  }

  private competition (id: string): Competition {
    const competition: Competition = new Competition();

    competition.id = id;

    return competition;
  }

  private season (id: string): Season {
    const season: Season = new Season();

    season.id = id;

    return season;
  }

  private team (id: string): Team {
    const team: Team = new Team();

    team.id = id;

    return team;
  }
}
