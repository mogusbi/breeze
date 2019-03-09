/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-any
import {Validator} from 'class-validator';
import {IsArrayWithLength} from './isArrayWithLength';

class TestDto {
  @IsArrayWithLength()
  public defaultArray: string[];

  @IsArrayWithLength(3)
  public customArray: string[];
}

describe('IsArrayWithLength', (): void => {
  let validator: Validator;

  beforeEach((): void => {
    validator = new Validator();
  });

  it('should fail if min length constraint is not met', async (): Promise<void> => {
    const dto: TestDto = Object.assign(new TestDto(), {
      customArray: [
        'test-1',
        'test-2'
      ],
      defaultArray: []
    });

    await expect(validator.validate(dto)).resolves.toMatchSnapshot();
  });

  it('should fail if value is not an array', async (): Promise<void> => {
    const dto: TestDto = Object.assign(new TestDto(), {
      customArray: <any>'test-1',
      defaultArray: [
        'test-1'
      ]
    });

    await expect(validator.validate(dto)).resolves.toMatchSnapshot();
  });

  it('should pass if min length constraint is met', async (): Promise<void> => {
    const dto: TestDto = Object.assign(new TestDto(), {
      customArray: [
        'test-1',
        'test-2',
        'test-3'
      ],
      defaultArray: [
        'test-1'
      ]
    });

    await expect(validator.validate(dto)).resolves.toMatchSnapshot();
  });
});
