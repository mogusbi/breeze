/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition, Fixture, Season, Team} from '@breezejs/sql';
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {FixtureEnum} from './fixture.enum';
import {FixtureService} from './fixture.service';

describe('FixtureService', (): void => {
  let fixture: jest.Mocked<Repository<Fixture>>;
  let fixtureService: FixtureService;
  let away: Team;
  let competition: Competition;
  let home: Team;
  let season: Season;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: FixtureEnum.providerToken,
            useClass: Fixture
          },
          FixtureService
        ]
      })
      .compile();

    fixture = testModule.get(FixtureEnum.providerToken);
    fixtureService = testModule.get(FixtureService);

    away = new Team();
    competition = new Competition();
    home = new Team();
    season = new Season();

    away.id = 'TEAM-B-ID';
    away.name = 'Team B';
    competition.id = 'COMPETITION-ID';
    competition.name = 'UEFA Champions League';
    home.id = 'TEAM-A-ID';
    home.name = 'Team A';
    season.id = 'SEASON-ID';
    season.name = '2018/19';
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      const entity: Fixture = new Fixture();

      entity.away = away;
      entity.awayScore = 2;
      entity.competition = competition;
      entity.home = home;
      entity.homeScore = 4;
      entity.season = season;

      await fixtureService.create(entity);

      expect(fixture.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: Fixture = new Fixture();

      entity.away = away;
      entity.awayScore = 2;
      entity.competition = competition;
      entity.home = home;
      entity.homeScore = 4;
      entity.season = season;

      fixture.create.mockReturnValueOnce(entity);

      await fixtureService.create(entity);

      expect(fixture.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await fixtureService.findOne('fixture-id', {
        select: null
      });

      expect(fixture.createQueryBuilder).toHaveBeenCalledWith('fixture');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.away', 'away');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.competition', 'competition');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.home', 'home');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.season', 'season');
      expect(fixture.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(fixture.createQueryBuilder().where).toHaveBeenCalledWith('fixture.id = :id', {
        id: 'fixture-id'
      });
      expect(fixture.createQueryBuilder().getOne).toHaveBeenCalledWith();
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await fixtureService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(fixture.createQueryBuilder).toHaveBeenCalledWith('fixture');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.away', 'away');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.competition', 'competition');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.home', 'home');
      expect(fixture.createQueryBuilder().innerJoinAndSelect).toHaveBeenCalledWith('fixture.season', 'season');
      expect(fixture.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(fixture.createQueryBuilder().skip).toHaveBeenCalledWith(0);
      expect(fixture.createQueryBuilder().take).toHaveBeenCalledWith(10);
      expect(fixture.createQueryBuilder().orderBy).toHaveBeenCalledWith({});
      expect(fixture.createQueryBuilder().getManyAndCount).toHaveBeenCalledWith();
    });
  });

  describe('remove', (): void => {
    it('should call delete with the correct params', async (): Promise<void> => {
      fixture.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await fixtureService.remove('fixture-id');

      expect(fixture.delete).toHaveBeenCalledWith('fixture-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      fixture.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      const entity: Fixture = new Fixture();

      entity.away = away;
      entity.awayScore = 3;
      entity.competition = competition;
      entity.home = home;
      entity.homeScore = 4;
      entity.season = season;

      await fixtureService.update('fixture-id', entity);

      expect(fixture.update).toHaveBeenCalledWith('fixture-id', entity);
    });
  });
});
