/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {Article, ArticleService} from '@breezejs/article';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ArticleController} from './article.controller';

describe('ArticleController', (): void => {
  let articleController: ArticleController;
  let articleService: jest.Mocked<ArticleService>;

  beforeEach(async (): Promise<void> => {
    const testModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          ArticleController
        ],
        providers: [
          ArticleService
        ]
      })
      .compile();

    articleController = testModule.get(ArticleController);
    articleService = testModule.get(ArticleService);
  });

  describe('create', (): void => {
    it('should call articleService.create with the correct params', async (): Promise<void> => {
      await articleController.create({
        alternativeTitle: null,
        authorId: 'author-id',
        content: 'Hello world',
        publishDate: '01-01-2019',
        teaser: null,
        title: 'Test article'
      });

      expect(articleService.create).toHaveBeenCalledWith(expect.any(Article));
    });

    it('should throw BadRequestException if article cannot be created', async (): Promise<void> => {
      articleService.create.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(articleController.create({
        alternativeTitle: null,
        authorId: 'author-id',
        content: 'Hello world',
        publishDate: '01-01-2019',
        teaser: null,
        title: 'Test article'
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('getArticle', (): void => {
    it('should call articleService.findOne with the correct params', async (): Promise<void> => {
      articleService.findOne.mockResolvedValueOnce({
        id: 'article-id'
      });

      await articleController.getArticle('article-id', {
        select: [
          'title'
        ]
      });

      expect(articleService.findOne).toHaveBeenCalledWith('article-id', {
        select: [
          'title'
        ]
      });
    });

    it('should throw NotFoundException if article does not exist', async (): Promise<void> => {
      articleService.findOne.mockResolvedValueOnce(null);

      await expect(articleController.getArticle('article-id', {
        select: [
          'title'
        ]
      })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if article cannot be retrieved', async (): Promise<void> => {
      articleService.findOne.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(articleController.getArticle('article-id', {
        select: [
          'title'
        ]
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAll', (): void => {
    it('should call articleService.listAll with the correct params', async (): Promise<void> => {
      await articleController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });

      expect(articleService.listAll).toHaveBeenCalledWith({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      });
    });

    it('should throw BadRequestException if articles cannot be retrieved', async (): Promise<void> => {
      articleService.listAll.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(articleController.listAll({
        order: {},
        page: 1,
        select: null,
        skip: 0,
        take: 10
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', (): void => {
    it('should call articleService.remove with the correct params', async (): Promise<void> => {
      await articleController.remove('article-id');

      expect(articleService.remove).toHaveBeenCalledWith('article-id');
    });

    it('should throw NotFoundException if article does not exist', async (): Promise<void> => {
      articleService.remove.mockResolvedValueOnce(0);

      await expect(articleController.remove('article-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if article cannot be deleted', async (): Promise<void> => {
      articleService.remove.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(articleController.remove('article-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', (): void => {
    it('should call articleService.update with the correct params', async (): Promise<void> => {
      await articleController.update(
        {
          alternativeTitle: null,
          authorId: 'author-id',
          content: 'Hello world',
          publishDate: '01-01-2019',
          teaser: null,
          title: 'Updated article'
        },
        'article-id'
      );

      expect(articleService.update).toHaveBeenCalledWith('article-id', expect.any(Article));
    });

    it('should throw NotFoundException if article does not exist', async (): Promise<void> => {
      articleService.update.mockResolvedValueOnce(0);

      await expect(articleController.update(
        {
          alternativeTitle: null,
          authorId: 'author-id',
          content: 'Hello world',
          publishDate: '01-01-2019',
          teaser: null,
          title: 'Updated article'
        },
        'article-id'
      )).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if article cannot be updated', async (): Promise<void> => {
      articleService.update.mockRejectedValueOnce(new Error('Oops, something has gone wrong'));

      await expect(articleController.update(
        {
          alternativeTitle: null,
          authorId: 'author-id',
          content: 'Hello world',
          publishDate: '01-01-2019',
          teaser: null,
          title: 'Updated article'
        },
        'article-id'
      )).rejects.toThrow(BadRequestException);
    });
  });
});
