/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Team} from '@breezejs/sql';
import {TeamService} from '@breezejs/team';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {TeamController} from './team.controller';

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

      expect(teamService.create).toHaveBeenCalledWith(expect.any(Team));
    });

    it('should throw BadRequestException if team cannot be created', async (): Promise<void> => {
      teamService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(teamController.create({
        name: 'Team name'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getTeam', (): void => {
    it('should call teamService.findOne with the correct params', async (): Promise<void> => {
      teamService.findOne.mockResolvedValueOnce({
        id: 'team-id'
      });

      await teamController.getTeam('team-id', {
        select: [
          'name'
        ]
      });

      expect(teamService.findOne).toHaveBeenCalledWith('team-id', {
        select: [
          'name'
        ]
      });
    });

    it('should throw NotFoundException if team does not exist', async (): Promise<void> => {
      teamService.findOne.mockResolvedValueOnce(null);

      await expect(teamController.getTeam('team-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if team cannot be retrieved', async (): Promise<void> => {
      teamService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(teamController.getTeam('team-id', {
        select: [
          'name'
        ]
      })).rejects.toThrow(BadRequestException);
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

    it('should throw BadRequestException if teams cannot be retrieved', async (): Promise<void> => {
      teamService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(teamController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call teamService.remove with the correct params', async (): Promise<void> => {
      await teamController.remove('team-id');

      expect(teamService.remove).toHaveBeenCalledWith('team-id');
    });

    it('should throw NotFoundException if team does not exist', async (): Promise<void> => {
      teamService.remove.mockResolvedValueOnce(0);

      await expect(teamController.remove('team-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if team cannot be deleted', async (): Promise<void> => {
      teamService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(teamController.remove('team-id')).rejects.toThrow(BadRequestException);
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

      expect(teamService.update).toHaveBeenCalledWith('team-id', expect.any(Team));
    });

    it('should throw NotFoundException if team does not exist', async (): Promise<void> => {
      teamService.update.mockResolvedValueOnce(0);

      await expect(teamController.update(
        {
          name: 'Update name'
        },
        'team-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if team cannot be updated', async (): Promise<void> => {
      teamService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(teamController.update(
        {
          name: 'Update name'
        },
        'team-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
