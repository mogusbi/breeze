/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */

/**
 * Mock team service
 */
export class TeamService {
  public create: jest.Mock = jest.fn();
  public listAll: jest.Mock = jest.fn();
  public remove: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
}
