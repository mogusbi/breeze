/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Season} from './season.entity';
import {SeasonEnum} from './season.enum';
import {SeasonService} from './season.service';

jest.mock('./season.entity');

describe('SeasonService', (): void => {
  let season: jest.Mocked<Repository<Season>>;
  let seasonService: SeasonService;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: SeasonEnum.providerToken,
            useClass: Season
          },
          SeasonService
        ]
      })
      .compile();

    season = testModule.get(SeasonEnum.providerToken);
    seasonService = testModule.get(SeasonService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      await seasonService.create({
        name: '2019/20'
      });

      expect(season.create).toHaveBeenCalledWith({
        name: '2019/20'
      });
    });

    it('should call save with the correct params', async (): Promise<void> => {
      season.create.mockReturnValueOnce({
        id: 'id',
        name: '2019/20'
      });

      await seasonService.create({
        name: '2019/20'
      });

      expect(season.save).toHaveBeenCalledWith({
        id: 'id',
        name: '2019/20'
      });
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await seasonService.findOne('season-id', {
        select: null
      });

      expect(season.findOne).toHaveBeenCalledWith('season-id', {
        select: null
      });
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await seasonService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(season.findAndCount).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });
  });

  describe('remove', (): void => {
    it('should call delete with the correct params', async (): Promise<void> => {
      season.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await seasonService.remove('season-id');

      expect(season.delete).toHaveBeenCalledWith('season-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      season.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await seasonService.update('season-id', {
        name: '2018/2019'
      });

      expect(season.update).toHaveBeenCalledWith('season-id', {
        name: '2018/2019'
      });
    });
  });
});
