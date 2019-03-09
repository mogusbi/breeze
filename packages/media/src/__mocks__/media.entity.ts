/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-reserved-keywords

/**
 * Mock media repository
 */
export class Media {
  public create: jest.Mock = jest.fn();
  public delete: jest.Mock = jest.fn();
  public findAndCount: jest.Mock = jest.fn();
  public findOne: jest.Mock = jest.fn();
  public save: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
}
