/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breeze/request';
import {Team, TeamService} from '@breeze/team';
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
      const team: Team = new Team();

      team.name = dto.name;

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
    @Pagination() options: PaginationOptions<Team>
  ): Promise<[Team[], number]> {
    try {
      return await this.teamService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  public async getTeam (
    @Param('id') id: string,
    @Filter() options: FilterOptions<Team>
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
      const team: Team = new Team();

      team.id = id;
      team.name = dto.name;

      count = await this.teamService.update(id, team);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
