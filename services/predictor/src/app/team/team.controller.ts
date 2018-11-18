/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Pagination, PaginationInterceptor, PaginationOptions} from '@breeze-bb/pagination';
import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from '@nestjs/common';
import {TeamDto} from './team.dto';
import {Team} from './team.entity';
import {TeamService} from './team.service';

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
    return this.teamService.create(dto);
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
    return this.teamService.listAll(options);
  }

  /**
   * [Delete] Removes a team
   *
   * @param id - Team id
   */
  @Delete(':id')
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    await this.teamService.remove(id);
  }

  /**
   * [PATCH] Updates a team
   *
   * @param dto - Team data transfer object
   * @param id - Team id
   */
  @Patch(':id')
  public async update (
    @Body() dto: TeamDto,
    @Param('id') id: string
  ): Promise<void> {
    await this.teamService.update(id, dto);
  }
}
