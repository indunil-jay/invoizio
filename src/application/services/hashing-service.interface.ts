export interface IHashingService {
  hash(password: string): Promise<string>;
  compare(inputPassword: string, dbPassword: string): Promise<boolean>;
}
