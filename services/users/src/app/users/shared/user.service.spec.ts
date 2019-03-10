/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {UserEnum} from './user.enum';
import {UserService} from './user.service';

jest.mock('./user.entity');

describe('UserService', (): void => {
  let user: jest.Mocked<Repository<User>>;
  let userService: UserService;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: UserEnum.providerToken,
            useClass: User
          },
          UserService
        ]
      })
      .compile();

    user = testModule.get(UserEnum.providerToken);
    userService = testModule.get(UserService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      const entity: User = new User();

      entity.emailAddress = 'test@example.com';

      await userService.create(entity);

      expect(user.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: User = new User();

      entity.emailAddress = 'test@example.com';

      user.create.mockReturnValueOnce(entity);

      await userService.create(entity);

      expect(user.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await userService.findOne('user-id', {
        select: null
      });

      expect(user.findOne).toHaveBeenCalledWith('user-id', {
        select: null
      });
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await userService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(user.findAndCount).toHaveBeenCalledWith({
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
      user.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await userService.remove('user-id');

      expect(user.delete).toHaveBeenCalledWith('user-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      user.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      const entity: User = new User();

      entity.id = 'user-id';
      entity.emailAddress = 'updated@example.com';

      await userService.update('user-id', entity);

      expect(user.update).toHaveBeenCalledWith('user-id', entity);
    });
  });
});
