/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breeze/request';
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
import {SeasonDto} from './season.dto';
import {Season} from './season.entity';
import {SeasonService} from './season.service';

/**
 * Controller for /seasons endpoints
 */
@Controller('seasons')
export class SeasonController {
  /**
   * @param seasonService - Season service
   */
  constructor (
    private readonly seasonService: SeasonService
  ) {}

  /**
   * [Post] Creates a new season
   *
   * @param dto - Season data transfer object
   *
   * @returns Newly created season entity
   */
  @Post()
  public async create (
    @Body() dto: SeasonDto
  ): Promise<Season> {
    try {
      return await this.seasonService.create(dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of seasons
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of season entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions<Season>
  ): Promise<[Season[], number]> {
    try {
      return await this.seasonService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  public async getSeason (
    @Param('id') id: string,
    @Filter() options: FilterOptions<Season>
  ): Promise<Season> {
    try {
      const season: Season = await this.seasonService.findOne(id, options);

      if (Boolean(season)) {
        return season;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a season
   *
   * @param id - Season id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.seasonService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a season
   *
   * @param dto - Season data transfer object
   * @param id - Season id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: SeasonDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.seasonService.update(id, dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
