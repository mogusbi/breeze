/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {Team} from '@breezejs/sql';
import {TeamService} from '@breezejs/team';
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
import {TeamDto} from '../shared';

/**
 * Controller for /teams endpoints
 */
@Controller('teams')
export class TeamController {
  /**
   * @param teamService - Team service
   */
  constructor (
    private readonly teamService: TeamService
  ) {}

  /**
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Team data transfer object
   *
   * @return Team entity
   */
  private static createTeam (dto: TeamDto): Team {
    const team: Team = new Team();

    team.name = dto.name;

    return team;
  }

  /**
   * [Post] Creates a new team
   *
   * @param dto - Team data transfer object
   *
   * @returns Newly created team entity
   */
  @Post()
  public async create (
    @Body() dto: TeamDto
  ): Promise<Team> {
    try {
      const team: Team = TeamController.createTeam(dto);

      return await this.teamService.create(team);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of teams
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of team entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions
  ): Promise<[Team[], number]> {
    try {
      return await this.teamService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A single team
   *
   * @param id - Team id
   * @param options - Serialised query string params for filtering
   *
   * @return A Tean entity
   */
  @Get(':id')
  public async getTeam (
    @Param('id') id: string,
    @Filter() options: FilterOptions
  ): Promise<Team> {
    try {
      const team: Team = await this.teamService.findOne(id, options);

      if (Boolean(team)) {
        return team;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a team
   *
   * @param id - Team id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.teamService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a team
   *
   * @param dto - Team data transfer object
   * @param id - Team id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: TeamDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      const team: Team = TeamController.createTeam(dto);

      count = await this.teamService.update(id, team);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
