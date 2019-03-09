/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {MediaDto} from './media.dto';
import {Media} from './media.entity';
import {MediaService} from './media.service';

/**
 * Controller for /media endpoints
 */
@Controller('media')
export class MediaController {
  /**
   * @param mediaService - Media service
   */
  constructor (
    private readonly mediaService: MediaService
  ) {}

  /**
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Media data transfer object
   *
   * @return Media entity
   */
  private static createMedia (dto: MediaDto): Media {
    return Object.assign(new Media(), dto);
  }

  /**
   * [Post] Creates a new media item
   *
   * @param dto - Media data transfer object
   *
   * @returns Newly created media entity
   */
  @Post()
  public async create (
    @Body() dto: MediaDto
  ): Promise<Media> {
    try {
      const media: Media = MediaController.createMedia(dto);

      return await this.mediaService.create(media);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of media items
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of Media entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions<Media>
  ): Promise<[Media[], number]> {
    try {
      return await this.mediaService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A single media item
   *
   * @param id - Media id
   * @param options - Serialised query string params for filtering
   *
   * @return A Media entity
   */
  @Get(':id')
  public async getMedia (
    @Param('id') id: string,
    @Filter() options: FilterOptions<Media>
  ): Promise<Media> {
    try {
      const media: Media = await this.mediaService.findOne(id, options);

      if (Boolean(media)) {
        return media;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a media item
   *
   * @param id - Media id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.mediaService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a media item
   *
   * @param dto - Media data transfer object
   * @param id - Media id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: MediaDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      const media: Media = MediaController.createMedia(dto);

      count = await this.mediaService.update(id, media);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
