/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Team} from '@breezejs/sql';
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {TeamEnum} from './team.enum';
import {TeamService} from './team.service';

describe('TeamService', (): void => {
  let team: jest.Mocked<Repository<Team>>;
  let teamService: TeamService;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: TeamEnum.providerToken,
            useClass: Team
          },
          TeamService
        ]
      })
      .compile();

    team = testModule.get(TeamEnum.providerToken);
    teamService = testModule.get(TeamService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      const entity: Team = new Team();

      entity.name = 'New team';

      await teamService.create(entity);

      expect(team.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: Team = new Team();

      entity.name = 'New team';

      team.create.mockReturnValueOnce(entity);

      await teamService.create(entity);

      expect(team.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await teamService.findOne('team-id', {
        select: null
      });

      expect(team.createQueryBuilder).toHaveBeenCalledWith('team');
      expect(team.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(team.createQueryBuilder().where).toHaveBeenCalledWith('team.id = :id', {
        id: 'team-id'
      });
      expect(team.createQueryBuilder().getOne).toHaveBeenCalledWith();
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await teamService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(team.createQueryBuilder).toHaveBeenCalledWith('team');
      expect(team.createQueryBuilder().select).toHaveBeenCalledWith(null);
      expect(team.createQueryBuilder().skip).toHaveBeenCalledWith(0);
      expect(team.createQueryBuilder().take).toHaveBeenCalledWith(10);
      expect(team.createQueryBuilder().orderBy).toHaveBeenCalledWith({});
      expect(team.createQueryBuilder().getManyAndCount).toHaveBeenCalledWith();
    });
  });

  describe('remove', (): void => {
    it('should call delete with the correct params', async (): Promise<void> => {
      team.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await teamService.remove('team-id');

      expect(team.delete).toHaveBeenCalledWith('team-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      team.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      const entity: Team = new Team();

      entity.id = 'team-id';
      entity.name = 'Updated name';

      await teamService.update('team-id', entity);

      expect(team.update).toHaveBeenCalledWith('team-id', entity);
    });
  });
});
