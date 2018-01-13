export interface IPagination {
  [name: string]: IPaginationProp;
}

export interface IPaginationProp {
  description?: string;
  name: string;
  required?: boolean;
  type?: any;
}
