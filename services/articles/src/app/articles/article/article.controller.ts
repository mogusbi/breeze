/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Filter, FilterOptions, Pagination, PaginationInterceptor, PaginationOptions} from '@breezejs/request';
import {Article} from '@breezejs/sql';
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
import {ArticleDto, ArticleService} from '../shared';

/**
 * Controller for /articles endpoints
 */
@Controller('articles')
export class ArticleController {
  /**
   * @param articleService - Article service
   */
  constructor (
    private readonly articleService: ArticleService
  ) {}

  /**
   * Converts a data transfer object into a valid entitiy
   *
   * @param dto - Article data transfer object
   *
   * @return Article entity
   */
  private static createArticle (dto: ArticleDto): Article {
    return Object.assign(new Article(), dto);
  }

  /**
   * [Post] Creates a new article
   *
   * @param dto - Article data transfer object
   *
   * @returns Newly created article entity
   */
  @Post()
  public async create (
    @Body() dto: ArticleDto
  ): Promise<Article> {
    try {
      const article: Article = ArticleController.createArticle(dto);

      return await this.articleService.create(article);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A paginated list of articles
   *
   * @param options - Serialised query string params for pagination
   *
   * @returns List of Article entities
   */
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public async listAll (
    @Pagination() options: PaginationOptions
  ): Promise<[Article[], number]> {
    try {
      return await this.articleService.listAll(options);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * [GET] A single article
   *
   * @param id - Article id
   * @param options - Serialised query string params for filtering
   *
   * @return A Article entity
   */
  @Get(':id')
  public async getArticle (
    @Param('id') id: string,
    @Filter() options: FilterOptions
  ): Promise<Article> {
    try {
      const article: Article = await this.articleService.findOne(id, options);

      if (Boolean(article)) {
        return article;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    throw new NotFoundException();
  }

  /**
   * [Delete] Removes a article
   *
   * @param id - Article id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove (
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      count = await this.articleService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }

  /**
   * [PATCH] Updates a article
   *
   * @param dto - Article data transfer object
   * @param id - Article id
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update (
    @Body() dto: ArticleDto,
    @Param('id') id: string
  ): Promise<void> {
    let count: number;

    try {
      const article: Article = ArticleController.createArticle(dto);

      count = await this.articleService.update(id, article);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
