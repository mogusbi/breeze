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
  let item1: Test;
  let item2: Test;

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

      item1 = await repository.create(entity);

      expect(item1).toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        name: 'New row 1',
        updatedAt: expect.any(String)
      });
    });

    it('should create the second new item', async (): Promise<void> => {
      const entity: Test = new Test();

      entity.name = 'New row 2';

      item2 = await repository.create(entity);

      expect(item2).toEqual({
        createdAt: expect.any(String),
        id: expect.any(String),
        name: 'New row 2',
        updatedAt: expect.any(String)
      });
    });
  });

  describe('findAndCount', (): void => {
    it('should return all items in the table', async (): Promise<void> => {
      const result: Test[] = [
        item2,
        item1
      ];

      await expect(repository.findAndCount(Test)).resolves.toEqual([result, 2]);
    });

    it.todo('should return page 1 of a paginated query');

    it.todo('should return page 2 of a paginated query');

    it.todo('should return a filtered list');
  });

  describe('findOne', (): void => {
    it('should find item by ID', async (): Promise<void> => {
      await expect(repository.findOne(item1.id, item1)).resolves.toEqual(item1);
    });

    it('should throw an error if item cannot be found', async (): Promise<void> => {
      const dummy: Test = new Test();

      dummy.id = 'fake-id';

      await expect(repository.findOne(dummy.id, dummy)).rejects.toThrowError();
    });

    it.todo('should return a filtered item');
  });

  describe('update', (): void => {
    it('should update an item', async (): Promise<void> => {
      item1.name = 'Updated row 1';

      await expect(repository.update(item1.id, item1)).resolves.toEqual(item1);
    });
  });

  describe('remove', (): void => {
    it('should remove an item', async (): Promise<void> => {
      await expect(repository.update(item1.id, item1)).resolves.toEqual(item1);
    });
  });
});
