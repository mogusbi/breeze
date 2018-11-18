/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-reserved-keywords

/**
 * Mock team repository
 */
export class Team {
  public create: jest.Mock = jest.fn();
  public delete: jest.Mock = jest.fn();
  public findAndCount: jest.Mock = jest.fn();
  public save: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
}
