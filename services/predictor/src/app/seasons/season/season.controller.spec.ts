/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Season, SeasonService} from '@breeze/season';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {SeasonController} from './season.controller';

describe('SeasonController', (): void => {
  let seasonController: SeasonController;
  let seasonService: jest.Mocked<SeasonService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          SeasonController
        ],
        providers: [
          SeasonService
        ]
      })
      .compile();

    seasonController = testModule.get(SeasonController);
    seasonService = testModule.get(SeasonService);
  });

  describe('create', (): void => {
    it('should call seasonService.create with the correct params', async (): Promise<void> => {
      await seasonController.create({
        name: '2019/20'
      });

      expect(seasonService.create).toHaveBeenCalledWith(expect.any(Season));
    });

    it('should throw BadRequestException if season cannot be created', async (): Promise<void> => {
      seasonService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(seasonController.create({
        name: '2019/20'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getSeason', (): void => {
    it('should call seasonService.findOne with the correct params', async (): Promise<void> => {
      seasonService.findOne.mockResolvedValueOnce({
        id: 'season-id'
      });

      await seasonController.getSeason('season-id', {
        select: [
          'name'
        ]
      });

      expect(seasonService.findOne).toHaveBeenCalledWith('season-id', {
        select: [
          'name'
        ]
      });
    });

    it('should throw NotFoundException if season does not exist', async (): Promise<void> => {
      seasonService.findOne.mockResolvedValueOnce(null);

      await expect(seasonController.getSeason('season-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if season cannot be retrieved', async (): Promise<void> => {
      seasonService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(seasonController.getSeason('season-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call seasonService.listAll with the correct params', async (): Promise<void> => {
      await seasonController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(seasonService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if seasons cannot be retrieved', async (): Promise<void> => {
      seasonService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(seasonController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call seasonService.remove with the correct params', async (): Promise<void> => {
      await seasonController.remove('season-id');

      expect(seasonService.remove).toHaveBeenCalledWith('season-id');
    });

    it('should throw NotFoundException if season does not exist', async (): Promise<void> => {
      seasonService.remove.mockResolvedValueOnce(0);

      await expect(seasonController.remove('season-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if season cannot be deleted', async (): Promise<void> => {
      seasonService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(seasonController.remove('season-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call seasonService.update with the correct params', async (): Promise<void> => {
      await seasonController.update(
        {
          name: '2018/19'
        },
        'season-id'
      );

      expect(seasonService.update).toHaveBeenCalledWith('season-id', expect.any(Season));
    });

    it('should throw NotFoundException if season does not exist', async (): Promise<void> => {
      seasonService.update.mockResolvedValueOnce(0);

      await expect(seasonController.update(
        {
          name: '2018/19'
        },
        'season-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if season cannot be updated', async (): Promise<void> => {
      seasonService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(seasonController.update(
        {
          name: '2018/19'
        },
        'season-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
