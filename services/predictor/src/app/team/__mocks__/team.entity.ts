/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
export const Team: jest.Mock = jest.fn(() => ({
  create: jest.fn(),
  delete: jest.fn(),
  findAndCount: jest.fn(),
  save: jest.fn(),
  update: jest.fn()
}));
