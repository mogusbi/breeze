/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Competition} from './competition.entity';
import {CompetitionEnum} from './competition.enum';
import {CompetitionService} from './competition.service';

jest.mock('./competition.entity');

describe('CompetitionService', (): void => {
  let competition: jest.Mocked<Repository<Competition>>;
  let competitionService: CompetitionService;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: CompetitionEnum.providerToken,
            useClass: Competition
          },
          CompetitionService
        ]
      })
      .compile();

    competition = testModule.get(CompetitionEnum.providerToken);
    competitionService = testModule.get(CompetitionService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      await competitionService.create({
        name: 'UEFA Nations League'
      });

      expect(competition.create).toHaveBeenCalledWith({
        name: 'UEFA Nations League'
      });
    });

    it('should call save with the correct params', async (): Promise<void> => {
      competition.create.mockReturnValueOnce({
        id: 'id',
        name: 'UEFA Nations League'
      });

      await competitionService.create({
        name: 'UEFA Nations League'
      });

      expect(competition.save).toHaveBeenCalledWith({
        id: 'id',
        name: 'UEFA Nations League'
      });
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await competitionService.findOne('competition-id', {
        select: null
      });

      expect(competition.findOne).toHaveBeenCalledWith('competition-id', {
        select: null
      });
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await competitionService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(competition.findAndCount).toHaveBeenCalledWith({
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
      competition.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await competitionService.remove('competition-id');

      expect(competition.delete).toHaveBeenCalledWith('competition-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      competition.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await competitionService.update('competition-id', {
        name: 'Football League 1'
      });

      expect(competition.update).toHaveBeenCalledWith('competition-id', {
        name: 'Football League 1'
      });
    });
  });
});
