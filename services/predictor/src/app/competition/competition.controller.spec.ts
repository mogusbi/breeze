/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {CompetitionController} from './competition.controller';
import {CompetitionService} from './competition.service';

jest.mock('./competition.service');

describe('CompetitionController', (): void => {
  let competitionController: CompetitionController;
  let competitionService: jest.Mocked<CompetitionService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          CompetitionController
        ],
        providers: [
          CompetitionService
        ]
      })
      .compile();

    competitionController = testModule.get(CompetitionController);
    competitionService = testModule.get(CompetitionService);
  });

  describe('create', (): void => {
    it('should call competitionService.create with the correct params', async (): Promise<void> => {
      await competitionController.create({
        name: '2019/20'
      });

      expect(competitionService.create).toHaveBeenCalledWith({
        name: '2019/20'
      });
    });

    it('should throw BadRequestException if competition cannot be created', async (): Promise<void> => {
      competitionService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(competitionController.create({
        name: '2019/20'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getCompetition', (): void => {
    it('should call competitionService.findOne with the correct params', async (): Promise<void> => {
      competitionService.findOne.mockResolvedValueOnce({
        id: 'competition-id'
      });

      await competitionController.getCompetition('competition-id', {
        select: [
          'name'
        ]
      });

      expect(competitionService.findOne).toHaveBeenCalledWith('competition-id', {
        select: [
          'name'
        ]
      });
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      competitionService.findOne.mockResolvedValueOnce(null);

      await expect(competitionController.getCompetition('competition-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be retrieved', async (): Promise<void> => {
      competitionService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(competitionController.getCompetition('competition-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call competitionService.listAll with the correct params', async (): Promise<void> => {
      await competitionController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(competitionService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if competitions cannot be retrieved', async (): Promise<void> => {
      competitionService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(competitionController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call competitionService.remove with the correct params', async (): Promise<void> => {
      await competitionController.remove('competition-id');

      expect(competitionService.remove).toHaveBeenCalledWith('competition-id');
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      competitionService.remove.mockResolvedValueOnce(0);

      await expect(competitionController.remove('competition-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be deleted', async (): Promise<void> => {
      competitionService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(competitionController.remove('competition-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call competitionService.update with the correct params', async (): Promise<void> => {
      await competitionController.update(
        {
          name: 'Competition name'
        },
        'competition-id'
      );

      expect(competitionService.update).toHaveBeenCalledWith('competition-id', {
        name: 'Competition name'
      });
    });

    it('should throw NotFoundException if competition does not exist', async (): Promise<void> => {
      competitionService.update.mockResolvedValueOnce(0);

      await expect(competitionController.update(
        {
          name: 'Competition name'
        },
        'competition-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if competition cannot be updated', async (): Promise<void> => {
      competitionService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(competitionController.update(
        {
          name: 'Competition name'
        },
        'competition-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
