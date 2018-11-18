/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {TeamController} from './team.controller';
import {TeamService} from './team.service';

jest.mock('./team.service');

describe('TeamController', (): void => {
  let teamController: TeamController;
  let teamService: jest.Mocked<TeamService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          TeamController
        ],
        providers: [
          TeamService
        ]
      })
      .compile();

    teamController = testModule.get(TeamController);
    teamService = testModule.get(TeamService);
  });

  describe('create', (): void => {
    it('should call teamService.create with the correct params', async (): Promise<void> => {
      await teamController.create({
        name: 'Team name'
      });

      expect(teamService.create).toHaveBeenCalledWith({
        name: 'Team name'
      });
    });
  });

  describe('listAll', (): void => {
    it('should call teamService.listAll with the correct params', async (): Promise<void> => {
      await teamController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(teamService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });
  });

  describe('remove', (): void => {
    it('should call teamService.remove with the correct params', async (): Promise<void> => {
      await teamController.remove('team-id');

      expect(teamService.remove).toHaveBeenCalledWith('team-id');
    });
  });

  describe('update', (): void => {
    it('should call teamService.update with the correct params', async (): Promise<void> => {
      await teamController.update(
        {
          name: 'Update name'
        },
        'team-id'
      );

      expect(teamService.update).toHaveBeenCalledWith('team-id', {
        name: 'Update name'
      });
    });
  });
});
