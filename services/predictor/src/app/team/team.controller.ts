/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Pagination, PaginationOptions} from '@breeze-bb/pagination';
import {Body, Controller, Get, Post} from '@nestjs/common';
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
   * [Post] Creates new team entity
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
   * @returns List of team entities
   */
  @Get()
  public async listAll (
    @Pagination() options: PaginationOptions
  ): Promise<Team[]> {
    return this.teamService.listAll(options);
  }
}
