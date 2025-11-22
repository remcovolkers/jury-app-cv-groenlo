import { Vote } from '../../domain/entities/Vote';
import { IVoteRepository } from '../../domain/ports/IVoteRepository';

const STORAGE_KEY = 'jury_votes_v2';

export class LocalStorageVoteRepository implements IVoteRepository {
    async save(vote: Vote): Promise<void> {
        const votes = await this.getAllMap();
        votes[vote.participantId] = vote;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    }

    async getAll(): Promise<Vote[]> {
        const votes = await this.getAllMap();
        return Object.values(votes);
    }

    async getByJuryCode(juryCode: string): Promise<Vote[]> {
        const all = await this.getAll();
        return all.filter(v => v.juryCode === juryCode);
    }

    async getVote(participantId: string, juryCode: string): Promise<Vote | undefined> {
        const votes = await this.getAllMap();
        const vote = votes[participantId];
        if (vote && vote.juryCode === juryCode) {
            return vote;
        }
        return undefined;
    }

    async clearAll(): Promise<void> {
        localStorage.removeItem(STORAGE_KEY);
    }

    private async getAllMap(): Promise<Record<string, Vote>> {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    }
}
