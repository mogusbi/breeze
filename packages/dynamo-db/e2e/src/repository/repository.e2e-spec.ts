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

  describe('findOne', (): void => {
    it('should find item by ID', async (): Promise<void> => {
      await expect(repository.findOne(item.id, item)).resolves.toEqual(item);
    });

    it('should throw an error if item cannot be found', async (): Promise<void> => {
      const dummy: Test = new Test();

      dummy.id = 'fake-id';

      await expect(repository.findOne(dummy.id, dummy)).rejects.toThrowError();
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

  describe('remove', (): void => {
    it('should remove an item', async (): Promise<void> => {
      await expect(repository.update(item.id, item)).resolves.toEqual({
        createdAt: item.createdAt,
        id: item.id,
        name: 'Updated row 1',
        updatedAt: expect.any(String)
      });
    });
  });
});
