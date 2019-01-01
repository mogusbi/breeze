/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Fixture, FixtureService} from '@breeze/fixture';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {FixtureController} from './fixture.controller';

describe('FixtureController', (): void => {
  let fixtureController: FixtureController;
  let fixtureService: jest.Mocked<FixtureService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          FixtureController
        ],
        providers: [
          FixtureService
        ]
      })
      .compile();

    fixtureController = testModule.get(FixtureController);
    fixtureService = testModule.get(FixtureService);
  });

  describe('create', (): void => {
    it('should call fixtureService.create with the correct params', async (): Promise<void> => {
      await fixtureController.create({
        away: 'AWAY-TEAM-ID',
        awayScore: null,
        competition: 'COMPETITION-ID',
        date: '01/01/2019',
        home: 'HOME-TEAM-ID',
        homeScore: null,
        season: 'SEASON-ID'
      });

      expect(fixtureService.create).toHaveBeenCalledWith(expect.any(Fixture));
    });

    it('should throw BadRequestException if competition cannot be created', async (): Promise<void> => {
      fixtureService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(fixtureController.create({
        away: 'AWAY-TEAM-ID',
        awayScore: null,
        competition: 'COMPETITION-ID',
        date: '01/01/2019',
        home: 'HOME-TEAM-ID',
        homeScore: null,
        season: 'SEASON-ID'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getFixture', (): void => {
    it('should call fixtureService.findOne with the correct params', async (): Promise<void> => {
      fixtureService.findOne.mockResolvedValueOnce({
        id: 'fixture-id'
      });

      await fixtureController.getFixture('fixture-id', {
        select: [
          'away',
          'home'
        ]
      });

      expect(fixtureService.findOne).toHaveBeenCalledWith('fixture-id', {
        select: [
          'away',
          'home'
        ]
      });
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      fixtureService.findOne.mockResolvedValueOnce(null);

      await expect(fixtureController.getFixture('fixture-id', {
        select: [
          'away',
          'home'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be retrieved', async (): Promise<void> => {
      fixtureService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(fixtureController.getFixture('fixture-id', {
        select: [
          'away',
          'home'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call fixtureService.listAll with the correct params', async (): Promise<void> => {
      await fixtureController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(fixtureService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if competitions cannot be retrieved', async (): Promise<void> => {
      fixtureService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(fixtureController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call fixtureService.remove with the correct params', async (): Promise<void> => {
      await fixtureController.remove('fixture-id');

      expect(fixtureService.remove).toHaveBeenCalledWith('fixture-id');
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      fixtureService.remove.mockResolvedValueOnce(0);

      await expect(fixtureController.remove('fixture-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be deleted', async (): Promise<void> => {
      fixtureService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(fixtureController.remove('fixture-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call fixtureService.update with the correct params', async (): Promise<void> => {
      await fixtureController.update(
        {
          away: 'AWAY-TEAM-ID',
          awayScore: 1,
          competition: 'COMPETITION-ID',
          date: '01/01/2019',
          home: 'HOME-TEAM-ID',
          homeScore: 3,
          season: 'SEASON-ID'
        },
        'fixture-id'
      );

      expect(fixtureService.update).toHaveBeenCalledWith('fixture-id', expect.any(Fixture));
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      fixtureService.update.mockResolvedValueOnce(0);

      await expect(fixtureController.update(
        {
          away: 'AWAY-TEAM-ID',
          awayScore: 1,
          competition: 'COMPETITION-ID',
          date: '01/01/2019',
          home: 'HOME-TEAM-ID',
          homeScore: 3,
          season: 'SEASON-ID'
        },
        'fixture-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be updated', async (): Promise<void> => {
      fixtureService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(fixtureController.update(
        {
          away: 'AWAY-TEAM-ID',
          awayScore: 1,
          competition: 'COMPETITION-ID',
          date: '01/01/2019',
          home: 'HOME-TEAM-ID',
          homeScore: 3,
          season: 'SEASON-ID'
        },
        'fixture-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
