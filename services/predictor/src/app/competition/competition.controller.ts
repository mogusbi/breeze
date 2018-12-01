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
import {CompetitionDto} from './competition.dto';
import {Competition} from './competition.entity';
import {CompetitionService} from './competition.service';

/**
 * Controller for /competitions endpoints
 */
@Controller('competitions')
export class CompetitionController {
  /**
   * @param competitionService - Competition service
   */
  constructor (
    private readonly competitionService: CompetitionService
  ) {}

  /**
   * [Post] Creates a new competition
   *
   * @param dto - Competition data transfer object
   *
   * @returns Newly created competition entity
   */
  @Post()
  public async create (
    @Body() dto: CompetitionDto
  ): Promise<Competition> {
    try {
      return await this.competitionService.create(dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of competitions
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of Competition entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions<Competition>
  ): Promise<[Competition[], number]> {
    try {
      return await this.competitionService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  public async getCompetition (
    @Param('id') id: string,
    @Filter() options: FilterOptions<Competition>
  ): Promise<Competition> {
    try {
      const competition: Competition = await this.competitionService.findOne(id, options);

      if (Boolean(competition)) {
        return competition;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a competition
   *
   * @param id - Competition id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.competitionService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a competition
   *
   * @param dto - Competition data transfer object
   * @param id - Competition id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: CompetitionDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.competitionService.update(id, dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
