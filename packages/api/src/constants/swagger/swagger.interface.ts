export interface ISwagger {
  [name: string]: ISwaggerProp;
}

export interface ISwaggerProp {
  description: string;
  isArray?: boolean;
  status: number;
  type?: any;
}
