import { Vote } from '../entities/Vote';

export interface IVoteRepository {
    save(vote: Vote): Promise<void>;
    getAll(): Promise<Vote[]>;
    getByJuryCode(juryCode: string): Promise<Vote[]>;
    getVote(participantId: string, juryCode: string): Promise<Vote | undefined>;
    clearAll(): Promise<void>;
}
