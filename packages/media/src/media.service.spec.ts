/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {MediaSource} from './media-source';
import {Media} from './media.entity';
import {MediaEnum} from './media.enum';
import {MediaService} from './media.service';

jest.mock('./media.entity');

describe('MediaService', (): void => {
  let media: jest.Mocked<Repository<Media>>;
  let mediaService: MediaService;
  let mediaSource1: MediaSource;
  let mediaSource2: MediaSource;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: MediaEnum.providerToken,
            useClass: Media
          },
          MediaService
        ]
      })
      .compile();

    media = testModule.get(MediaEnum.providerToken);
    mediaService = testModule.get(MediaService);

    mediaSource1 = new MediaSource();
    mediaSource2 = new MediaSource();

    mediaSource1.name = 'image';
    mediaSource1.path = '/path/to/image.jpg';
    mediaSource2.name = 'video';
    mediaSource2.path = '/path/to/video.mp4';
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      const entity: Media = new Media();

      entity.description = 'New media';
      entity.source = [
        mediaSource1,
        mediaSource2
      ];

      await mediaService.create(entity);

      expect(media.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: Media = new Media();

      entity.description = 'New media';
      entity.source = [
        mediaSource1,
        mediaSource2
      ];

      media.create.mockReturnValueOnce(entity);

      await mediaService.create(entity);

      expect(media.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await mediaService.findOne('media-id', {
        select: null
      });

      expect(media.findOne).toHaveBeenCalledWith('media-id', {
        select: null
      });
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await mediaService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(media.findAndCount).toHaveBeenCalledWith({
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
      media.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await mediaService.remove('media-id');

      expect(media.delete).toHaveBeenCalledWith('media-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      media.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      const entity: Media = new Media();

      entity.id = 'media-id';
      entity.description = 'Updated name';
      entity.source = [
        mediaSource1,
        mediaSource2
      ];

      await mediaService.update('media-id', entity);

      expect(media.update).toHaveBeenCalledWith('media-id', entity);
    });
  });
});
