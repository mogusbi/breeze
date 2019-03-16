/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition} from '@breezejs/sql';
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {CompetitionEnum} from './competition.enum';
import {CompetitionService} from './competition.service';

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
      const entity: Competition = new Competition();

      entity.name = 'UEFA Nations League';

      await competitionService.create(entity);

      expect(competition.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: Competition = new Competition();

      entity.name = 'UEFA Nations League';

      competition.create.mockReturnValueOnce(entity);

      await competitionService.create(entity);

      expect(competition.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await competitionService.findOne('competition-id', {
        select: null
      });

      expect(competition.createQueryBuilder).toHaveBeenCalledWith('competition');
      expect(competition.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(competition.createQueryBuilder().where).toHaveBeenCalledWith('competition.id = :id', {
        id: 'competition-id'
      });
      expect(competition.createQueryBuilder().getOne).toHaveBeenCalledWith();
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

      expect(competition.createQueryBuilder).toHaveBeenCalledWith('competition');
      expect(competition.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(competition.createQueryBuilder().skip).toHaveBeenCalledWith(0);
      expect(competition.createQueryBuilder().take).toHaveBeenCalledWith(10);
      expect(competition.createQueryBuilder().orderBy).toHaveBeenCalledWith({});
      expect(competition.createQueryBuilder().getManyAndCount).toHaveBeenCalledWith();
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

      const entity: Competition = new Competition();

      entity.id = 'competition-id';
      entity.name = 'Football League 1';

      await competitionService.update('competition-id', entity);

      expect(competition.update).toHaveBeenCalledWith('competition-id', entity);
    });
  });
});
