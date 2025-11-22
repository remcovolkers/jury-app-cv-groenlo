export interface IAuthService {
    login(code: string): Promise<boolean>;
    getAssignedParticipantIds(code: string): Promise<string[]>;
}
