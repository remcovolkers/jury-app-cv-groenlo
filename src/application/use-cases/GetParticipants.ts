import { IParticipantRepository } from '../../domain/ports/IParticipantRepository';
import { IVoteRepository } from '../../domain/ports/IVoteRepository';
import { Participant } from '../../domain/entities/Participant';
import { Vote } from '../../domain/entities/Vote';

export interface ParticipantWithVote extends Participant {
    vote?: Vote;
}

export class GetParticipants {
    constructor(
        private participantRepo: IParticipantRepository,
        private voteRepo: IVoteRepository
    ) { }

    async execute(juryCode: string, categoryId: string): Promise<ParticipantWithVote[]> {
        const participants = await this.participantRepo.getByJuryCode(juryCode);
        const categoryParticipants = participants.filter(p => p.category === categoryId);

        const votes = await this.voteRepo.getByJuryCode(juryCode);

        return categoryParticipants.map(p => ({
            ...p,
            vote: votes.find(v => v.participantId === p.id)
        }));
    }
}
