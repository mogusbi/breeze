/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition, CompetitionService} from '@breeze/competition';
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
import {CompetitionDto} from '../shared';

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
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Competition data transfer object
   *
   * @return Competition entity
   */
  private static createCompetition (dto: CompetitionDto): Competition {
    const competition: Competition = new Competition();

    competition.name = dto.name;

    return competition;
  }

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
      const competition: Competition = CompetitionController.createCompetition(dto);

      return await this.competitionService.create(competition);
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

  /**
   * [GET] A single competition
   *
   * @param id - Competition id
   * @param options - Serialised query string params for filtering
   *
   * @return A Competition entity
   */
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
      const competition: Competition = CompetitionController.createCompetition(dto);

      count = await this.competitionService.update(id, competition);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
