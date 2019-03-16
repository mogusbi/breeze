/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Media} from '@breezejs/sql';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MediaController} from './media.controller';
import {MediaService} from './media.service';

jest.mock('./media.service');

describe('MediaController', (): void => {
  let mediaController: MediaController;
  let mediaService: jest.Mocked<MediaService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          MediaController
        ],
        providers: [
          MediaService
        ]
      })
      .compile();

    mediaController = testModule.get(MediaController);
    mediaService = testModule.get(MediaService);
  });

  describe('create', (): void => {
    it('should call mediaService.create with the correct params', async (): Promise<void> => {
      await mediaController.create({
        copyright: null,
        description: 'Test media',
        source: [
          {
            name: 'main',
            path: '/path/to/main/image.jpg'
          },
          {
            name: 'thumbnail',
            path: '/path/to/thumbnail/image.jpg'
          }
        ]
      });

      expect(mediaService.create).toHaveBeenCalledWith(expect.any(Media));
    });

    it('should throw BadRequestException if media cannot be created', async (): Promise<void> => {
      mediaService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(mediaController.create({
        copyright: null,
        description: 'Test media',
        source: [
          {
            name: 'main',
            path: '/path/to/main/image.jpg'
          },
          {
            name: 'thumbnail',
            path: '/path/to/thumbnail/image.jpg'
          }
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getMedia', (): void => {
    it('should call mediaService.findOne with the correct params', async (): Promise<void> => {
      mediaService.findOne.mockResolvedValueOnce({
        id: 'media-id'
      });

      await mediaController.getMedia('media-id', {
        select: [
          'source'
        ]
      });

      expect(mediaService.findOne).toHaveBeenCalledWith('media-id', {
        select: [
          'source'
        ]
      });
    });

    it('should throw NotFoundException if media does not exist', async (): Promise<void> => {
      mediaService.findOne.mockResolvedValueOnce(null);

      await expect(mediaController.getMedia('media-id', {
        select: [
          'source'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if media cannot be retrieved', async (): Promise<void> => {
      mediaService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(mediaController.getMedia('media-id', {
        select: [
          'source'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call mediaService.listAll with the correct params', async (): Promise<void> => {
      await mediaController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(mediaService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if media cannot be retrieved', async (): Promise<void> => {
      mediaService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(mediaController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call mediaService.remove with the correct params', async (): Promise<void> => {
      await mediaController.remove('media-id');

      expect(mediaService.remove).toHaveBeenCalledWith('media-id');
    });

    it('should throw NotFoundException if media does not exist', async (): Promise<void> => {
      mediaService.remove.mockResolvedValueOnce(0);

      await expect(mediaController.remove('media-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if media cannot be deleted', async (): Promise<void> => {
      mediaService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(mediaController.remove('media-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call mediaService.update with the correct params', async (): Promise<void> => {
      await mediaController.update(
        {
          copyright: null,
          description: 'Updated media',
          source: [
            {
              name: 'main',
              path: '/path/to/main/image.jpg'
            }
          ]
        },
        'media-id'
      );

      expect(mediaService.update).toHaveBeenCalledWith('media-id', expect.any(Media));
    });

    it('should throw NotFoundException if media does not exist', async (): Promise<void> => {
      mediaService.update.mockResolvedValueOnce(0);

      await expect(mediaController.update(
        {
          copyright: null,
          description: 'Updated media',
          source: [
            {
              name: 'main',
              path: '/path/to/main/image.jpg'
            }
          ]
        },
        'media-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if media cannot be updated', async (): Promise<void> => {
      mediaService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(mediaController.update(
        {
          copyright: null,
          description: 'Updated media',
          source: [
            {
              name: 'main',
              path: '/path/to/main/image.jpg'
            }
          ]
        },
        'media-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
