/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
// tslint:disable no-reserved-keywords

export enum SqlEnum {
  providerToken = 'SqlProviderToken'
}

export class Season {
  public create: jest.Mock = jest.fn();
  public createQueryBuilder: jest.Mock = jest.fn().mockReturnValue(this);
  public delete: jest.Mock = jest.fn();
  public getManyAndCount: jest.Mock = jest.fn().mockReturnValue(this);
  public getOne: jest.Mock = jest.fn().mockReturnValue(this);
  public innerJoinAndSelect: jest.Mock = jest.fn().mockReturnValue(this);
  public orderBy: jest.Mock = jest.fn().mockReturnValue(this);
  public save: jest.Mock = jest.fn();
  public select: jest.Mock = jest.fn().mockReturnValue(this);
  public skip: jest.Mock = jest.fn().mockReturnValue(this);
  public take: jest.Mock = jest.fn().mockReturnValue(this);
  public update: jest.Mock = jest.fn();
  public where: jest.Mock = jest.fn().mockReturnValue(this);
}
