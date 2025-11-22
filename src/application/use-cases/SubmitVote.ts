import { IVoteRepository } from '../../domain/ports/IVoteRepository';
import { Vote } from '../../domain/entities/Vote';

export class SubmitVote {
    constructor(private voteRepo: IVoteRepository) { }

    async execute(vote: Vote): Promise<void> {
        await this.voteRepo.save(vote);
    }
}
