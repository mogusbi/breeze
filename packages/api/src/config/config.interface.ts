export interface IConfig {
  database: IDatabaseConfig;
  pagination: IPaginationConfig;
}

export interface IDatabaseConfig {
  connectionString: string;
}

export interface IPaginationConfig {
  max: number;
  min: number;
  size: number;
}
