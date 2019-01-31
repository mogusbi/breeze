/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Competition} from '@breezejs/competition';
import {Fixture, FixtureService} from '@breezejs/fixture';
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {Season} from '@breezejs/season';
import {Team} from '@breezejs/team';
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
import {FixtureDto} from '../shared';

/**
 * Controller for /fixtures endpoints
 */
@Controller('fixtures')
export class FixtureController {
  constructor (
    private readonly fixtureService: FixtureService
  ) {}

  /**
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Fixture data transfer object
   *
   * @return Fixture entity
   */
  private static createFixture (dto: FixtureDto): Fixture {
    const away: Team = new Team();
    const competition: Competition = new Competition();
    const fixture: Fixture = new Fixture();
    const home: Team = new Team();
    const season: Season = new Season();

    away.id = dto.away;
    competition.id = dto.competition;
    home.id = dto.home;
    season.id = dto.season;

    fixture.away = away;
    fixture.awayScore = dto.awayScore;
    fixture.competition = competition;
    fixture.date = dto.date;
    fixture.home = home;
    fixture.homeScore = dto.homeScore;
    fixture.season = season;

    return fixture;
  }

  /**
   * [Post] Creates a new season
   *
   * @param dto - Fixture data transfer object
   *
   * @returns Newly created season entity
   */
  @Post()
  public async create (
    @Body() dto: FixtureDto
  ): Promise<Fixture> {
    try {
      const fixture: Fixture = FixtureController.createFixture(dto);

      return await this.fixtureService.create(fixture);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of fixtures
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of fixture entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions<Fixture>
  ): Promise<[Fixture[], number]> {
    try {
      return await this.fixtureService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A single fixture
   *
   * @param id - Fixture id
   * @param options - Serialised query string params for filtering
   *
   * @return A Fixture entity
   */
  @Get(':id')
  public async getFixture (
    @Param('id') id: string,
    @Filter() options: FilterOptions<Fixture>
  ): Promise<Fixture> {
    try {
      const fixture: Fixture = await this.fixtureService.findOne(id, options);

      if (Boolean(fixture)) {
        return fixture;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a fixture
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
      count = await this.fixtureService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a fixture
   *
   * @param dto - Fixture data transfer object
   * @param id - Fixture id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: FixtureDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      const fixture: Fixture = FixtureController.createFixture(dto);

      count = await this.fixtureService.update(id, fixture);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
