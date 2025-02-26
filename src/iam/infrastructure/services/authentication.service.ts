import { injectable } from "inversify";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";

@injectable()
export class AuthenticationService implements IAuthenticationService {}
