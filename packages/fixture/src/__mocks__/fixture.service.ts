/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */

/**
 * Mock fixture service
 */
export class FixtureService {
  public create: jest.Mock = jest.fn();
  public findOne: jest.Mock = jest.fn();
  public listAll: jest.Mock = jest.fn();
  public remove: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
}
