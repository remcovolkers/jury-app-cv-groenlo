import { IAuthService } from '../../domain/ports/IAuthService';

export class LoginJury {
    constructor(private authService: IAuthService) { }

    async execute(code: string): Promise<boolean> {
        return this.authService.login(code);
    }
}
