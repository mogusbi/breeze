/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Article} from './article.entity';
import {ArticleEnum} from './article.enum';
import {ArticleService} from './article.service';

jest.mock('./article.entity');

describe('ArticleService', (): void => {
  let article: jest.Mocked<Repository<Article>>;
  let articleService: ArticleService;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        providers: [
          {
            provide: ArticleEnum.providerToken,
            useClass: Article
          },
          ArticleService
        ]
      })
      .compile();

    article = testModule.get(ArticleEnum.providerToken);
    articleService = testModule.get(ArticleService);
  });

  describe('create', (): void => {
    it('should call create with the correct params', async (): Promise<void> => {
      const entity: Article = new Article();

      entity.title = 'New article';

      await articleService.create(entity);

      expect(article.create).toHaveBeenCalledWith(entity);
    });

    it('should call save with the correct params', async (): Promise<void> => {
      const entity: Article = new Article();

      entity.title = 'New article';

      article.create.mockReturnValueOnce(entity);

      await articleService.create(entity);

      expect(article.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findOne', (): void => {
    it('should call findOne with the correct params', async (): Promise<void> => {
      await articleService.findOne('article-id', {
        select: null
      });

      expect(article.findOne).toHaveBeenCalledWith('article-id', {
        select: null
      });
    });
  });

  describe('listAll', (): void => {
    it('should call findAndCount with the correct params', async (): Promise<void> => {
      await articleService.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(article.findAndCount).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });
  });

  describe('remove', (): void => {
    it('should call delete with the correct params', async (): Promise<void> => {
      article.delete.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      await articleService.remove('article-id');

      expect(article.delete).toHaveBeenCalledWith('article-id');
    });
  });

  describe('update', (): void => {
    it('should call update with the correct params', async (): Promise<void> => {
      article.update.mockResolvedValueOnce({
        raw: {
          affectedRows: 1
        }
      });

      const entity: Article = new Article();

      entity.id = 'article-id';
      entity.title = 'Updated name';

      await articleService.update('article-id', entity);

      expect(article.update).toHaveBeenCalledWith('article-id', entity);
    });
  });
});
