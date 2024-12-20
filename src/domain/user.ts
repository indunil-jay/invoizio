export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public emailVerified?: Date
  ) {}

  public verifyEmail() {
    this.emailVerified = new Date();
  }
}
