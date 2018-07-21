export interface IValidator {
  isAsync?: boolean;
  message: string;
  validator (value: string): boolean;
}
