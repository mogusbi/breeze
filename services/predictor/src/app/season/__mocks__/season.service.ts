/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */

/**
 * Mock season service
 */
export class SeasonService {
  public create: jest.Mock = jest.fn();
  public findOne: jest.Mock = jest.fn();
  public listAll: jest.Mock = jest.fn();
  public remove: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
}
