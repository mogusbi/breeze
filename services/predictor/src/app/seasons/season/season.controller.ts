/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {Season, SeasonService} from '@breezejs/season';
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
import {SeasonDto} from '../shared';

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
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Season data transfer object
   *
   * @return Season entity
   */
  private static createSeason (dto: SeasonDto): Season {
    const season: Season = new Season();

    season.name = dto.name;

    return season;
  }

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
      const season: Season = SeasonController.createSeason(dto);

      return await this.seasonService.create(season);
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

  /**
   * [GET] A single season
   *
   * @param id - Season id
   * @param options - Serialised query string params for filtering
   *
   * @return A Season entity
   */
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
      const season: Season = SeasonController.createSeason(dto);

      count = await this.seasonService.update(id, season);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
