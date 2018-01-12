export interface IConfig {
  database: IConfigDatabase;
}

export interface IConfigDatabase {
  connectionString: string;
}
