/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {User} from '@breezejs/sql';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from '../shared';
import {UserController} from './user.controller';

jest.mock('../shared/user.service');

describe('UserController', (): void => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          UserController
        ],
        providers: [
          UserService
        ]
      })
      .compile();

    userController = testModule.get(UserController);
    userService = testModule.get(UserService);
  });

  describe('create', (): void => {
    it('should call userService.create with the correct params', async (): Promise<void> => {
      await userController.create({
        emailAddress: 'test@example.com',
        forename: 'Test',
        surname: 'User'
      });

      expect(userService.create).toHaveBeenCalledWith(expect.any(User));
    });

    it('should throw BadRequestException if user cannot be created', async (): Promise<void> => {
      userService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(userController.create({
        emailAddress: 'test@example.com',
        forename: 'Test',
        surname: 'User'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getUser', (): void => {
    it('should call userService.findOne with the correct params', async (): Promise<void> => {
      userService.findOne.mockResolvedValueOnce({
        id: 'user-id'
      });

      await userController.getUser('user-id', {
        select: [
          'emailAddress'
        ]
      });

      expect(userService.findOne).toHaveBeenCalledWith('user-id', {
        select: [
          'emailAddress'
        ]
      });
    });

    it('should throw NotFoundException if user does not exist', async (): Promise<void> => {
      userService.findOne.mockResolvedValueOnce(null);

      await expect(userController.getUser('user-id', {
        select: [
          'emailAddress'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if user cannot be retrieved', async (): Promise<void> => {
      userService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(userController.getUser('user-id', {
        select: [
          'emailAddress'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call userService.listAll with the correct params', async (): Promise<void> => {
      await userController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(userService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if users cannot be retrieved', async (): Promise<void> => {
      userService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(userController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call userService.remove with the correct params', async (): Promise<void> => {
      await userController.remove('user-id');

      expect(userService.remove).toHaveBeenCalledWith('user-id');
    });

    it('should throw NotFoundException if user does not exist', async (): Promise<void> => {
      userService.remove.mockResolvedValueOnce(0);

      await expect(userController.remove('user-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if user cannot be deleted', async (): Promise<void> => {
      userService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(userController.remove('user-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call userService.update with the correct params', async (): Promise<void> => {
      await userController.update(
        {
          emailAddress: 'updated@example.com',
          forename: 'Test',
          surname: 'User'
        },
        'user-id'
      );

      expect(userService.update).toHaveBeenCalledWith('user-id', expect.any(User));
    });

    it('should throw NotFoundException if user does not exist', async (): Promise<void> => {
      userService.update.mockResolvedValueOnce(0);

      await expect(userController.update(
        {
          emailAddress: 'updated@example.com',
          forename: 'Test',
          surname: 'User'
        },
        'user-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if user cannot be updated', async (): Promise<void> => {
      userService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(userController.update(
        {
          emailAddress: 'updated@example.com',
          forename: 'Test',
          surname: 'User'
        },
        'user-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
