/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Team} from './team.entity';
import {TeamEnum} from './team.enum';
import {TeamService} from './team.service';

jest.mock('./team.entity');

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

    team = testModule.get<jest.Mocked<Repository<Team>>>(TeamEnum.providerToken);
    teamService = testModule.get<TeamService>(TeamService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      await teamService.create({
        name: 'New team'
      });

      expect(team.create).toHaveBeenCalledWith({
        name: 'New team'
      });
    });

    it('should call save with the correct params', async (): Promise<void> => {
      team.create.mockReturnValueOnce({
        id: 'id',
        name: 'New team'
      });

      await teamService.create({
        name: 'New team'
      });

      expect(team.save).toHaveBeenCalledWith({
        id: 'id',
        name: 'New team'
      });
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

      expect(team.findAndCount).toHaveBeenCalledWith({
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
      await teamService.remove('team-id');

      expect(team.delete).toHaveBeenCalledWith('team-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      await teamService.update('team-id', {
        name: 'Updated name'
      });

      expect(team.update).toHaveBeenCalledWith('team-id', {
        name: 'Updated name'
      });
    });
  });
});
