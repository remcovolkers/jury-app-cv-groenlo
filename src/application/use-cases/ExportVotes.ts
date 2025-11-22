import { IVoteRepository } from '../../domain/ports/IVoteRepository';
import { Vote } from '../../domain/entities/Vote';

export class ExportVotes {
    constructor(private voteRepo: IVoteRepository) { }

    async execute(juryCode: string): Promise<Vote[]> {
        // Admin sees all, others see their own
        if (juryCode === 'ADMIN') {
            return this.voteRepo.getAll();
        }
        return this.voteRepo.getByJuryCode(juryCode);
    }

    async clear(): Promise<void> {
        await this.voteRepo.clearAll();
    }
}
