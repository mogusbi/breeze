/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {attribute, table} from '@aws/dynamodb-data-mapper-annotations';
import {Base} from '../../../src/base';
import {Repository} from '../../../src/repository';

@table('test')
class Test extends Base {
  @attribute()
  public name: string;
}

describe('Repository', (): void => {
  let repository: Repository<Test>;
  let item: Test;

  beforeAll(async (): Promise<void> => {
    repository = new Repository();

    await repository.createTable(Test, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5
    });
  });

  afterAll(async (): Promise<void> => {
    await repository.deleteTable(Test);
  });

  describe('create', (): void => {
    it('should create the first new item', async (): Promise<void> => {
      const entity: Test = new Test();

      entity.name = 'New row 1';

      item = await repository.create(entity);

      expect(item).toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        name: 'New row 1',
        updatedAt: expect.any(String)
      });
    });

    it('should create the second new item', async (): Promise<void> => {
      const entity: Test = new Test();

      entity.name = 'New row 2';

      await expect(repository.create(entity)).resolves.toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        name: 'New row 2',
        updatedAt: expect.any(String)
      });
    });
  });

  describe('update', (): void => {
    it('should update an item', async (): Promise<void> => {
      item.name = 'Updated row 1';

      await expect(repository.update(item.id, item)).resolves.toEqual({
        createdAt: item.createdAt,
        id: item.id,
        name: 'Updated row 1',
        updatedAt: expect.any(String)
      });
    });
  });
});
